import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { AnimalsService, Placing } from 'src/app/services/animals/animals.service';
import { UsersService, Farm } from 'src/app/services/users/users.service';
import { Field } from 'src/app/services/crops/crops.service';
import { Machine } from 'src/app/services/machinery/machinery.service';
import { FarmTask } from 'src/app/services/farm-tasks/farm-tasks.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class MainComponent implements OnInit {

  /**
   * Current loaded farm
   */
  farm: Farm;

  /**
   * Animals summary object
   */
  animalsSummary: AnimalsSummary;

  /**
   * Crops summary object
   */
  cropsSummary: CropsSummary;

  /**
   * Machinery summary object
   */
  machinerySummary: MachinerySummary;

  /**
   * Tasks summary object
   */
  tasksSummary: TasksSummary;

  /**
   * Current year
   */
  currYear: number;

  //> Echarts

  //!Animals

  // List of echarts data objects
  animalsEchartsData: { value: number, name: string }[];

  // List of options objects
  animalsEchartsOptions: any;

  //!Crops

  // List of echarts data objects
  cropsEchartsData: { value: number, name: string }[];

  // List of options objects
  cropsEchartsOptions: any;

  //!Machinery

  // List of echarts data objects
  machineryEchartsData: { value: number, name: string }[];

  // List of options objects
  machineryEchartsOptions: any;

  //!Tasks

  // List of echarts data objects
  tasksEchartsData: { value: number, name: string }[];

  // List of options objects
  tasksEchartsOptions: any;

  constructor(private usersService: UsersService,
    private animalsService: AnimalsService,
    private authService: AuthService) { }

  ngOnInit() {
    this.loadFarm(this.authService.currentUserValue.id);
  }

  /**
   * Logout from app
   */
  logout() {
    this.authService.logout();
  }

  /**
   * Load farm info from db
   * @param idUser User id
   */
  loadFarm(idUser: number) {
    this.farm = undefined;
    this.usersService.getFarmByUserId(idUser).subscribe((data: Farm) => {
      this.farm = data;
      this.usersService.currFarm = data;

      this.parseSummaries(data);
    })
  }

  /**
   * Parse summaries from farm info
   */
  parseSummaries(farm: Farm) {
    this.parseAnimalsSummary(farm.placings);
    this.parseCropsSummary(farm.fields);
    this.parseMachinerySummary(farm.machines);
    this.parseTasksSummary(farm.tasks);
  }

  //>Animals card

  /**
   * Parse animals summary form a list of placings
   * @param placings List of placings
   */
  parseAnimalsSummary(placings: Placing[]) {
    // Init total summary
    this.animalsSummary = {
      animals: 0,
      youngs: 0,
      male: 0,
      female: 0,
      ill: 0
    }

    placings.forEach(placing => {
      // Loop through animals
      placing.animals.forEach(animal => {
        // Increase total animals
        this.animalsSummary.animals += 1;

        // Is young?
        if (animal.born && this.animalsService.isYoung(new Date(animal.born))) {
          this.animalsSummary.youngs += 1;
        }

        // Is male?
        if (animal.sex == 'M') {
          this.animalsSummary.male += 1;
        } else {
          this.animalsSummary.female += 1;
        }

        // Is ill?
        // Check if animal has open treatments
        let ill = false;
        if (animal.treatments) {
          animal.treatments.forEach(treatment => {
            if (!treatment.dateEnd) {
              ill = true;
            }
          })

          if (ill) {
            this.animalsSummary.ill += 1;
          }
        }
      })
    });

    // Init animal chart
    this.parseAnimalsChartData();
  }

  /**
   * Set data  objects to init charts
   */
  parseAnimalsChartData() {
    // Total summary chart
    let dataPoints = [];
    dataPoints[0] = {
      value: this.animalsSummary.male,
      name: 'M'
    }
    dataPoints[1] = {
      value: this.animalsSummary.female,
      name: 'F'
    }
    this.animalsEchartsData = dataPoints;

    // Parse options
    this.parseAnimalsChartOptions();
  }

  /**
   * Set options  objects to init charts
   */
  parseAnimalsChartOptions() {
    // Parse options
    let options = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        show: false,
        orient: 'vertical',
        x: 'left',
        data: ['M', 'F']
      },
      series: [
        {
          name: 'Sexos',
          type: 'pie',
          radius: ['30%', '90%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: "{c}",
              fontSize: 12
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: this.animalsEchartsData
        }
      ],
      color: ['#ffb900', '#ff7730']
    };

    this.animalsEchartsOptions = options;
  }

  //> Crops card

  parseCropsSummary(fields: Field[]) {
    // Init summary
    this.cropsSummary = {
      fields: 0,
      area: 0,
      spent: 0,
      smallFields: 0,
      bigFields: 0
    }

    fields.forEach(field => {
      // Increase number of fields
      this.cropsSummary.fields += 1;

      // Add area
      this.cropsSummary.area += field.area;

      if (field.area < 1) {
        this.cropsSummary.smallFields += 1;
      } else {
        this.cropsSummary.bigFields += 1;
      }

      // Add money spent on field for this year
      this.currYear = new Date().getFullYear();
      field.seasons.forEach(season => {
        if (season.year = this.currYear) {
          season.cropEvents.forEach(event => {
            this.cropsSummary.spent += event.moneySpent;
          })
        }
      })

    });

    this.parseCropsChartData();
  }

  /**
   * Set data  objects to init charts
   */
  parseCropsChartData() {
    // Total summary chart
    let dataPoints = [];
    dataPoints[0] = {
      value: this.cropsSummary.smallFields,
      name: '<1ha'
    }
    dataPoints[1] = {
      value: this.cropsSummary.bigFields,
      name: '>1ha'
    }
    this.cropsEchartsData = dataPoints;

    // Parse options
    this.parseCropsChartOptions();
  }

  /**
   * Set options  objects to init charts
   */
  parseCropsChartOptions() {
    // Parse options
    let options = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        show: false,
        orient: 'vertical',
        x: 'left',
        data: ['<1ha', '>1ha']
      },
      series: [
        {
          name: 'Tamaño',
          type: 'pie',
          radius: ['30%', '90%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: "{c}",
              fontSize: 12
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: this.cropsEchartsData
        }
      ],
      color: ['#7ed56f', '#28b485']
    };

    this.cropsEchartsOptions = options;
  }

  //> Machinery card

  parseMachinerySummary(machines: Machine[]) {
    // Init summary
    this.machinerySummary = {
      machines: 0,
      spent: 0,
      maintenances: 0,
      mantained: 0,
      unmantained: 0
    }

    machines.forEach(machine => {
      // Increase number of machines
      this.machinerySummary.machines += 1;

      // Increse ammount spent
      this.machinerySummary.spent += machine.cost;

      // Increase maintenances count
      if (machine.maintenances && machine.maintenances.length > 0) {
        this.machinerySummary.maintenances += machine.maintenances.length;
        this.machinerySummary.mantained += 1;
      } else {
        this.machinerySummary.unmantained += 1;
      }
    })

    this.parseMachineryChartData();
  }

  /**
   * Set data  objects to init charts
   */
  parseMachineryChartData() {
    // Total summary chart
    let dataPoints = [];
    dataPoints[0] = {
      value: this.machinerySummary.mantained,
      name: 'Mantenidas'
    }
    dataPoints[1] = {
      value: this.machinerySummary.unmantained,
      name: 'No mantenidas'
    }
    this.machineryEchartsData = dataPoints;

    // Parse options
    this.parseMachineryChartOptions();
  }

  /**
   * Set options  objects to init charts
   */
  parseMachineryChartOptions() {
    // Parse options
    let options = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        show: false,
        orient: 'vertical',
        x: 'left',
        data: ['Mantenidas', 'No mantenidas']
      },
      series: [
        {
          name: 'Mantenidas',
          type: 'pie',
          radius: ['30%', '90%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: "{c}",
              fontSize: 12
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: this.machineryEchartsData
        }
      ],
      color: ['#2998ff', '#5643fa']
    };

    this.machineryEchartsOptions = options;
  }

  //> Tasks card

  parseTasksSummary(tasks: FarmTask[]) {
    // Init summary
    this.tasksSummary = {
      completed: 0,
      pending: 0
    }

    tasks.forEach(task => {
      if (task.completed) {
        this.tasksSummary.completed += 1;
      } else {
        this.tasksSummary.pending += 1;
      }
    });

    this.parseTasksChartData();
  }

  /**
   * Set data  objects to init charts
   */
  parseTasksChartData() {
    // Total summary chart
    let dataPoints = [];
    dataPoints[0] = {
      value: this.tasksSummary.completed,
      name: 'Completadas'
    }
    dataPoints[1] = {
      value: this.tasksSummary.pending,
      name: 'Pendientes'
    }
    this.tasksEchartsData = dataPoints;

    // Parse options
    this.parseTasksChartOptions();
  }

  /**
   * Set options  objects to init charts
   */
  parseTasksChartOptions() {
    // Parse options
    let options = {
      tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b}: {c} ({d}%)"
      },
      legend: {
        show: false,
        orient: 'vertical',
        x: 'left',
        data: ['Completadas', 'Pendientes']
      },
      series: [
        {
          name: 'Tareas completadas',
          type: 'pie',
          radius: ['30%', '90%'],
          avoidLabelOverlap: false,
          label: {
            normal: {
              show: true,
              position: 'inside',
              formatter: "{c}",
              fontSize: 12
            }
          },
          labelLine: {
            normal: {
              show: false
            }
          },
          data: this.tasksEchartsData
        }
      ],
      color: ['#aaa', '#777']
    };

    this.tasksEchartsOptions = options;
  }

}

interface AnimalsSummary {
  animals: number,
  youngs: number,
  male: number,
  female: number,
  ill: number
}

interface CropsSummary {
  fields: number,
  area: number,
  spent: number,
  smallFields: number,
  bigFields: number
}

interface MachinerySummary {
  machines: number,
  spent: number,
  maintenances: number,
  mantained: number,
  unmantained: number
}

interface TasksSummary {
  completed: number,
  pending: number
}

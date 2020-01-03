import { Component, OnInit } from '@angular/core';
import { Placing, AnimalsService, PlacingSummary } from 'src/app/services/animals/animals.service';
import { Router } from '@angular/router';
import { Msg } from 'src/app/services/language/language.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-placings',
  templateUrl: './placings.component.html',
  styleUrls: ['./placings.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class PlacingsComponent implements OnInit {

  /**
   * Placings loaded
   */
  placings: Placing[];

  /**
   * Summary for all placings
   */
  totalSummary: PlacingSummary;

  //> Echarts

  // List of echarts data objects
  echartsData: { value: number, name: string }[][];

  // List of options objects
  echartsOptions: any[];

  //> Management

  /**
  * Show create modal
  */
  createModal: boolean;

  /**
   * Placing to update
   */
  placingUpdate: Placing;

  //> Messages

  /**
   * Message to show on msg-modal
   */
  msg: Msg;

  constructor(private animalsService: AnimalsService, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    //Get placings
    if (this.usersService.currFarm.id) {
      this.loadPlacings(this.usersService.currFarm.id);
    } else {
      this.router.navigate(['main']);
    }

  }

  /**
   * Load placings form database
   */
  loadPlacings(idFarm: number) {
    this.placings = undefined;
    this.animalsService.getPlacingByFarmId(idFarm).subscribe((data: Placing[]) => {
      this.placings = data;
      this.parsePlacings();
    });
  }
  /**
   * Parse placings summaries
   */
  parsePlacings() {
    // Init total summary
    this.totalSummary = {
      animals: 0,
      youngs: 0,
      male: 0,
      female: 0,
      ill: 0
    }

    this.placings.forEach(placing => {
      // Init placing summary
      placing.summary = {
        animals: placing.animals.length,
        youngs: 0,
        male: 0,
        female: 0,
        ill: 0
      }

      // Loop through animals
      placing.animals.forEach(animal => {
        // Increase total animals
        this.totalSummary.animals += 1;

        // Is young?
        if (animal.born && this.animalsService.isYoung(new Date(animal.born))) {
          placing.summary.youngs += 1;
          this.totalSummary.youngs += 1;
        }

        // Is male?
        if (animal.sex == 'M') {
          placing.summary.male += 1;
          this.totalSummary.male += 1;
        } else {
          placing.summary.female += 1;
          this.totalSummary.female += 1;
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
            placing.summary.ill += 1;
            this.totalSummary.ill += 1;
          }
        }
      })
    });

    // Init charts
    this.parseChartsData();
  }

  /**
   * Set data  objects to init charts
   */
  parseChartsData() {
    // Init data array
    this.echartsData = [];

    // Total summary chart
    let dataPoints = [];
    dataPoints[0] = {
      value: this.totalSummary.male,
      name: 'M'
    }
    dataPoints[1] = {
      value: this.totalSummary.female,
      name: 'H'
    }
    this.echartsData.push(dataPoints);

    // Placings charts
    this.placings.forEach(placing => {
      // Create dataPoint for each data on chart
      let dataPoints = [];
      dataPoints[0] = {
        value: placing.summary.male,
        name: 'M'
      }
      dataPoints[1] = {
        value: placing.summary.female,
        name: 'H'
      }
      this.echartsData.push(dataPoints);
    });

    // Parse options
    this.parseChartsOptions();
  }

  /**
   * Set options  objects to init charts
   */
  parseChartsOptions() {
    // Init options array
    this.echartsOptions = [];

    // Parse options
    this.echartsData.forEach(data => {
      let options = {
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
          show: false,
          orient: 'vertical',
          x: 'left',
          data: ['M', 'H']
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
            data: data
          }
        ],
        color: ['#ffb900', '#ff7730']
      };

      // Push to options array
      this.echartsOptions.push(options);
    })
  }

  /**
   * Select placing
   * @param idPlacing Id of placing selected
   */
  selectPlacing(idPlacing: number) {
    this.animalsService.selectedPlacingId = idPlacing;
    this.router.navigate(['animals-list']);
  }

  //> Management

  /**
   * Open creation modal
   */
  create() {
    this.placingUpdate = null;
    this.createModal = true;
  }

  /**
   * Open update modal
   * @param placing Object to update
   */
  update($event: MouseEvent, placing: Placing) {
    $event.stopPropagation();
    this.placingUpdate = placing;
    this.createModal = true;
  }

  /**
   * On modal close
   * @param msg Message returned
   */
  onModalReturn(msg: Msg) {
    this.createModal = false;
    this.placingUpdate = null;

    if (msg) {
      // Reload updated info
      this.loadPlacings(this.usersService.currFarm.id);

      // Show message
      this.showMessage(msg);
    }
  }

  /**
   * Show message modal
   * @param msg Message object
   */
  showMessage(msg: Msg) {
    this.msg = msg;
    // Set message to show
    setTimeout(() => {
      this.msg = null;
    }, 2000);
  }

}

import { Component, OnInit } from '@angular/core';
import { FarmTask, FarmTasksService } from 'src/app/services/farm-tasks/farm-tasks.service';
import { Msg } from 'src/app/services/language/language.service';
import { Router } from '@angular/router';
import { AnimalsService } from 'src/app/services/animals/animals.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class TasksComponent implements OnInit {

  /**
   * Expand task card?
   */
  expandTaskId: number;

  /**
   * Loaded tasks
   */
  tasks: FarmTask[];

  //> Management

  /**
  * Show create modal
  */
  createModal: boolean;

  /**
   * Object to update
   */
  objectUpdate: FarmTask;

  //> Messages

  /**
   * Message to show on msg-modal
   */
  msg: Msg;

  constructor(private tasksService: FarmTasksService, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    if (this.usersService.currFarm.id) {
      this.loadTasks(this.usersService.currFarm.id);
    } else {
      this.router.navigate(['main']);
    }
  }

  /**
   * Load tasks
   * @param idFarm Farm id
   */
  loadTasks(idFarm: number) {
    // Init array
    this.tasks = undefined;

    // Load from database
    this.tasksService.getFarmTaskByFarmId(idFarm).subscribe((data: FarmTask[]) => {
      this.tasks = data;
    })
  }

  /**
   * Expand clicked task card
   * @param idTask task id
   */
  expandTask(idTask: number) {
    this.expandTaskId = (this.expandTaskId != idTask) ? idTask : -1;
  }

  //> Management

  /**
   * Open creation modal
   */
  create() {
    this.objectUpdate = null;
    this.createModal = true;
  }

  /**
   * Open update modal
   * @param task Object to update
   */
  update($event: MouseEvent, task: FarmTask) {
    $event.stopPropagation();
    this.objectUpdate = task;
    this.createModal = true;
  }

  /**
   * On modal close
   * @param msg Message returned
   */
  onModalReturn(msg: Msg) {
    this.createModal = false;
    this.objectUpdate = null;

    if (msg) {
      // Reload updated info
      this.loadTasks(this.usersService.currFarm.id);

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

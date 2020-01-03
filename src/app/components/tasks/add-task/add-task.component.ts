import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FarmTask, FarmTasksService } from 'src/app/services/farm-tasks/farm-tasks.service';
import { Msg, LanguageService } from 'src/app/services/language/language.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnimalsService } from 'src/app/services/animals/animals.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  /**
   * Object to update
   */
  @Input() objectUpdate: FarmTask;

  /**
   * Msg to be returned by modal
   */
  @Output() returnMsg = new EventEmitter<Msg>();

  /**
   * Create object form
   */
  createForm: FormGroup;

  constructor(private animalsService: AnimalsService, private usersService: UsersService, private languageService: LanguageService, private tasksService: FarmTasksService) {
    // Init form
    this.createForm = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
      date: new FormControl(null, [
        Validators.required
      ]),
      completed: new FormControl()
    });
  }

  ngOnInit() {
    // Load today date
    this.createForm.get('date').setValue(this.animalsService.parseDateString(new Date()));

    // If update selected load values into form
    if (this.objectUpdate) {
      this.loadUpdate();
    }
  }

  /**
   * Create object on database
   */
  create() {
    // Create object
    let newObject: FarmTask = {
      id: null,
      description: this.createForm.get('description').value,
      date: this.createForm.get('date').value,
      completed: false,
      farm: {
        id: this.usersService.currFarm.id,
        location: null
      }
    };

    // Send object to database
    this.tasksService.createFarmTask(newObject).subscribe(data => {
      // Emit success
      this.returnMsg.emit(this.languageService.msgs.createSuccess);
    }, error => {
      // Emit error
      this.returnMsg.emit(this.languageService.msgs.createError);
    });

  }

  /**
   * Fill form with update info
   */
  loadUpdate() {
    console.log(this.objectUpdate.description)
    this.createForm.get('description').setValue(this.objectUpdate.description);
    this.createForm.get('completed').setValue(this.objectUpdate.completed);

    // Load date
    this.createForm.get('date').setValue(this.animalsService.parseDateString(new Date(this.objectUpdate.date)));
  }

  /**
   * Update object on database
   */
  update() {
    // Create object
    let newObject: FarmTask = {
      id: this.objectUpdate.id,
      description: this.createForm.get('description').value,
      date: this.createForm.get('date').value,
      completed: this.createForm.get('completed').value,
      farm: {
        id: this.usersService.currFarm.id,
        location: null
      }
    };

    // Send object to database
    this.tasksService.updateFarmTask(newObject).subscribe(data => {
      // Emit success
      this.returnMsg.emit(this.languageService.msgs.updateSuccess);
    }, error => {
      // Emit error
      this.returnMsg.emit(this.languageService.msgs.updateError);
    });

  }

  /**
   * Delete object on database
   */
  delete() {
    // Delete object from database
    this.tasksService.deleteFarmTask(this.objectUpdate.id).subscribe(data => {
      // Emit success
      this.returnMsg.emit(this.languageService.msgs.deleteSuccess);
    }, error => {
      // Emit error
      this.returnMsg.emit(this.languageService.msgs.deleteError);
    });
  }

  /**
   * Cancel operation
   */
  cancel() {
    this.returnMsg.emit(null);
  }

}

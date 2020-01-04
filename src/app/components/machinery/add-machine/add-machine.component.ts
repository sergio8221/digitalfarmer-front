import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MachineryService, Machine } from 'src/app/services/machinery/machinery.service';
import { Msg, LanguageService } from 'src/app/services/language/language.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsersService } from 'src/app/services/users/users.service';
import { AnimalsService } from 'src/app/services/animals/animals.service';

@Component({
  selector: 'app-add-machine',
  templateUrl: './add-machine.component.html',
  styleUrls: ['./add-machine.component.scss']
})
export class AddMachineComponent implements OnInit {

  /**
   * Object to update
   */
  @Input() objectUpdate: Machine;

  /**
   * Msg to be returned by modal
   */
  @Output() returnMsg = new EventEmitter<Msg>();

  /**
   * Create object form
   */
  createForm: FormGroup;

  constructor(private animalsService: AnimalsService,
    private machineryService: MachineryService,
    private usersService: UsersService,
    private languageService: LanguageService) {
    // Init form
    this.createForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      adquisition: new FormControl(null, [
        Validators.required
      ]),
      cost: new FormControl()
    });
  }

  ngOnInit() {
    // Load today date
    this.createForm.get('adquisition').setValue(this.animalsService.parseDateString(new Date()));

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
    let newObject: Machine = {
      id: null,
      name: this.createForm.get('name').value,
      adquisition: this.createForm.get('adquisition').value,
      cost: this.createForm.get('cost').value,
      farm: {
        id: this.usersService.currFarm.id,
        location: null
      }
    };

    // Send object to database
    this.machineryService.createMachine(newObject).subscribe(data => {
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
    this.createForm.get('name').setValue(this.objectUpdate.name);
    this.createForm.get('cost').setValue(this.objectUpdate.cost);

    // Load date
    this.createForm.get('adquisition').setValue(this.animalsService.parseDateString(new Date(this.objectUpdate.adquisition)));
  }

  /**
   * Update object on database
   */
  update() {
    // Create object
    let newObject: Machine = {
      id: this.objectUpdate.id,
      name: this.createForm.get('name').value,
      adquisition: this.createForm.get('adquisition').value,
      cost: this.createForm.get('cost').value,
      farm: {
        id: this.usersService.currFarm.id,
        location: null
      }
    };

    // Send object to database
    this.machineryService.updateMachine(newObject).subscribe(data => {
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
    this.machineryService.deleteMachine(this.objectUpdate.id).subscribe(data => {
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

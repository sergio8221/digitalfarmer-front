import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Maintenance, MachineryService } from 'src/app/services/machinery/machinery.service';
import { Msg, LanguageService } from 'src/app/services/language/language.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnimalsService } from 'src/app/services/animals/animals.service';

@Component({
  selector: 'app-add-maintenance',
  templateUrl: './add-maintenance.component.html',
  styleUrls: ['./add-maintenance.component.scss']
})
export class AddMaintenanceComponent implements OnInit {

  /**
   * Object to update
   */
  @Input() objectUpdate: Maintenance;

  /**
   * Msg to be returned by modal
   */
  @Output() returnMsg = new EventEmitter<Msg>();

  /**
   * Create object form
   */
  createForm: FormGroup;

  constructor(private machineryService: MachineryService, private languageService: LanguageService, private animalsService: AnimalsService) {
    // Init form
    this.createForm = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
      date: new FormControl(null, [
        Validators.required
      ])
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
    let newObject: Maintenance = {
      id: null,
      description: this.createForm.get('description').value,
      date: this.createForm.get('date').value,
      machine: {
        id: this.machineryService.selectedMachineId,
        adquisition: null,
        cost: null,
        name: null
      }
    };

    // Send object to database
    this.machineryService.createMaintenance(newObject).subscribe(data => {
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
    this.createForm.get('description').setValue(this.objectUpdate.description);

    // Load born date
    this.createForm.get('date').setValue(this.animalsService.parseDateString(new Date(this.objectUpdate.date)));
  }

  /**
   * Update object on database
   */
  update() {
    // Create object
    let newObject: Maintenance = {
      id: this.objectUpdate.id,
      description: this.createForm.get('description').value,
      date: this.createForm.get('date').value,
      machine: {
        id: this.machineryService.selectedMachineId,
        adquisition: null,
        cost: null,
        name: null
      }
    };

    // Send object to database
    this.machineryService.updateMaintenance(newObject).subscribe(data => {
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
    this.machineryService.deleteMaintenance(this.objectUpdate.id).subscribe(data => {
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

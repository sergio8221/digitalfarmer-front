import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Treatment, AnimalsService } from 'src/app/services/animals/animals.service';
import { Msg, LanguageService } from 'src/app/services/language/language.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-treatment',
  templateUrl: './add-treatment.component.html',
  styleUrls: ['./add-treatment.component.scss']
})
export class AddTreatmentComponent implements OnInit {

  /**
   * Object to update
   */
  @Input() objectUpdate: Treatment;

  /**
   * Msg to be returned by modal
   */
  @Output() returnMsg = new EventEmitter<Msg>();

  /**
   * Create object form
   */
  createForm: FormGroup;

  constructor(private animalsService: AnimalsService, private languageService: LanguageService) {
    // Init form
    this.createForm = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(100)
      ]),
      dateInit: new FormControl(null, [
        Validators.required
      ]),
      dateEnd: new FormControl()
    });
  }

  ngOnInit() {
    // Load today date
    this.createForm.get('dateInit').setValue(this.animalsService.parseDateString(new Date()));

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
    let newObject: Treatment = {
      id: null,
      description: this.createForm.get('description').value,
      dateInit: this.createForm.get('dateInit').value,
      dateEnd: null,
      animal: {
        id: this.animalsService.selectedAnimalId,
        born: null,
        code: null,
        name: null,
        sex: null
      }
    };

    // Send object to database
    this.animalsService.createTreatment(newObject).subscribe(data => {
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
    this.createForm.get('dateInit').setValue(this.animalsService.parseDateString(new Date(this.objectUpdate.dateInit)));
    if (this.objectUpdate.dateEnd) {
      this.createForm.get('dateEnd').setValue(this.animalsService.parseDateString(new Date(this.objectUpdate.dateEnd)));
    }
  }

  /**
   * Update object on database
   */
  update() {
    // Create object
    let newObject: Treatment = {
      id: this.objectUpdate.id,
      description: this.createForm.get('description').value,
      dateInit: this.createForm.get('dateInit').value,
      dateEnd: this.createForm.get('dateEnd').value
    };

    // Send object to database
    this.animalsService.updateTreatment(newObject).subscribe(data => {
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
    this.animalsService.deleteTreatment(this.objectUpdate.id).subscribe(data => {
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

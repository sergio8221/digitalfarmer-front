import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CropEvent, CropsService } from 'src/app/services/crops/crops.service';
import { Msg, LanguageService } from 'src/app/services/language/language.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AnimalsService } from 'src/app/services/animals/animals.service';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit {

  /**
  * Object to update
  */
  @Input() objectUpdate: CropEvent;

  /**
   * Msg to be returned by modal
   */
  @Output() returnMsg = new EventEmitter<Msg>();

  /**
   * Create object form
   */
  createForm: FormGroup;

  constructor(private cropsService: CropsService,
    private languageService: LanguageService,
    private animalsService: AnimalsService) {
    // Init form
    this.createForm = new FormGroup({
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      moneySpent: new FormControl(null, [
        Validators.min(0)
      ]),
      moneyEarned: new FormControl(null, [
        Validators.min(0)
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
    let newObject: CropEvent = {
      id: null,
      description: this.createForm.get('description').value,
      date: this.createForm.get('date').value,
      moneySpent: this.createForm.get('moneySpent').value,
      moneyEarned: this.createForm.get('moneyEarned').value,
      season: {
        id: this.cropsService.selectedSeasonId,
        crop: null,
        description: null,
        year: null
      }
    };

    // Send object to database
    this.cropsService.createCropEvent(newObject).subscribe(data => {
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
    this.createForm.get('moneySpent').setValue(this.objectUpdate.moneySpent);
    this.createForm.get('moneyEarned').setValue(this.objectUpdate.moneyEarned);

    // Load date
    this.createForm.get('date').setValue(this.animalsService.parseDateString(new Date(this.objectUpdate.date)));

  }

  /**
   * Update object on database
   */
  update() {
    // Create object
    let newObject: CropEvent = {
      id: this.objectUpdate.id,
      description: this.createForm.get('description').value,
      date: this.createForm.get('date').value,
      moneySpent: this.createForm.get('moneySpent').value,
      moneyEarned: this.createForm.get('moneyEarned').value,
      season: {
        id: this.cropsService.selectedSeasonId,
        crop: null,
        description: null,
        year: null
      }
    };

    // Send object to database
    this.cropsService.updateCropEvent(newObject).subscribe(data => {
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
    this.cropsService.deleteCropEvent(this.objectUpdate.id).subscribe(data => {
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

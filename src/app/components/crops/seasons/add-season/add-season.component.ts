import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Field, CropsService, Season } from 'src/app/services/crops/crops.service';
import { Msg, LanguageService } from 'src/app/services/language/language.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-season',
  templateUrl: './add-season.component.html',
  styleUrls: ['./add-season.component.scss']
})
export class AddSeasonComponent implements OnInit {

  /**
   * Object to update
   */
  @Input() objectUpdate: Season;

  /**
   * Msg to be returned by modal
   */
  @Output() returnMsg = new EventEmitter<Msg>();

  /**
   * Create object form
   */
  createForm: FormGroup;

  constructor(private cropsService: CropsService,
    private languageService: LanguageService) {
    // Init form
    this.createForm = new FormGroup({
      crop: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      year: new FormControl(null, [
        Validators.required,
        Validators.min(0)
      ])
    });
  }

  ngOnInit() {
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
    let newObject: Season = {
      id: null,
      crop: this.createForm.get('crop').value,
      description: this.createForm.get('description').value,
      year: this.createForm.get('year').value,
      field: {
        id: this.cropsService.selectedFieldId,
        area: null,
        description: null,
        location: null
      }
    };

    // Send object to database
    this.cropsService.createSeason(newObject).subscribe(data => {
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
    this.createForm.get('crop').setValue(this.objectUpdate.crop);
    this.createForm.get('description').setValue(this.objectUpdate.description);
    this.createForm.get('year').setValue(this.objectUpdate.year);
  }

  /**
   * Update object on database
   */
  update() {
    // Create object
    let newObject: Season = {
      id: this.objectUpdate.id,
      crop: this.createForm.get('crop').value,
      description: this.createForm.get('description').value,
      year: this.createForm.get('year').value,
      field: {
        id: this.cropsService.selectedFieldId,
        area: null,
        description: null,
        location: null
      }
    };

    // Send object to database
    this.cropsService.updateSeason(newObject).subscribe(data => {
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
    this.cropsService.deleteSeason(this.objectUpdate.id).subscribe(data => {
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

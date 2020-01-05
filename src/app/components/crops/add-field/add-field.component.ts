import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Field, CropsService } from 'src/app/services/crops/crops.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { Msg, LanguageService } from 'src/app/services/language/language.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-add-field',
  templateUrl: './add-field.component.html',
  styleUrls: ['./add-field.component.scss']
})
export class AddFieldComponent implements OnInit {

  /**
   * Object to update
   */
  @Input() objectUpdate: Field;

  /**
   * Msg to be returned by modal
   */
  @Output() returnMsg = new EventEmitter<Msg>();

  /**
   * Create object form
   */
  createForm: FormGroup;

  constructor(private cropsService: CropsService,
    private usersService: UsersService,
    private languageService: LanguageService) {
    // Init form
    this.createForm = new FormGroup({
      location: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      description: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      area: new FormControl(null, [
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
    let newObject: Field = {
      id: null,
      location: this.createForm.get('location').value,
      description: this.createForm.get('description').value,
      area: this.createForm.get('area').value,
      farm: {
        id: this.usersService.currFarm.id,
        location: null
      }
    };

    // Send object to database
    this.cropsService.createField(newObject).subscribe(data => {
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
    this.createForm.get('location').setValue(this.objectUpdate.location);
    this.createForm.get('description').setValue(this.objectUpdate.description);
    this.createForm.get('area').setValue(this.objectUpdate.area);
  }

  /**
   * Update object on database
   */
  update() {
    // Create object
    let newObject: Field = {
      id: this.objectUpdate.id,
      location: this.createForm.get('location').value,
      description: this.createForm.get('description').value,
      area: this.createForm.get('area').value,
      farm: {
        id: this.usersService.currFarm.id,
        location: null
      }
    };

    // Send object to database
    this.cropsService.updateField(newObject).subscribe(data => {
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
    this.cropsService.deleteField(this.objectUpdate.id).subscribe(data => {
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

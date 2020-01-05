import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Placing, AnimalsService } from 'src/app/services/animals/animals.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LanguageService, Msg } from 'src/app/services/language/language.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-add-placing',
  templateUrl: './add-placing.component.html',
  styleUrls: ['./add-placing.component.scss']
})
export class AddPlacingComponent implements OnInit {

  @Input() placingUpdate: Placing;

  @Output() returnMsg = new EventEmitter<Msg>();

  createForm: FormGroup;

  errorMsg: string;

  constructor(private animalsService: AnimalsService, private languageService: LanguageService, private usersService: UsersService) {
    // Init form
    this.createForm = new FormGroup({
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ])
    });
  }

  ngOnInit() {
    if (this.placingUpdate) {
      this.loadUpdate();
    }
  }

  /**
   * Create object on database
   */
  create() {
    // Create object
    let newPlacing: Placing = {
      id: null,
      name: this.createForm.get('name').value,
      farm: {
        id: this.usersService.currFarm.id,
        location: null
      }
    };

    // Send object to database
    this.animalsService.createPlacing(newPlacing).subscribe(data => {
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
    this.createForm.get('name').setValue(this.placingUpdate.name);
  }

  /**
   * Update object on database
   */
  update() {
    // Create object
    let newPlacing: Placing = {
      id: this.placingUpdate.id,
      name: this.createForm.get('name').value,
      farm: {
        id: this.usersService.currFarm.id,
        location: null
      }
    };

    // Send object to database
    this.animalsService.updatePlacing(newPlacing).subscribe(data => {
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
    this.animalsService.deletePlacing(this.placingUpdate.id).subscribe(data => {
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

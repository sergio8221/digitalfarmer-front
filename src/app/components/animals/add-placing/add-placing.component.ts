import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Placing, AnimalsService } from 'src/app/services/animals/animals.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LanguageService, Msg } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-add-placing',
  templateUrl: './add-placing.component.html',
  styleUrls: ['./add-placing.component.scss']
})
export class AddPlacingComponent implements OnInit {

  @Input() placingUpdate: Placing;

  @Output() returnMsg = new EventEmitter<Msg>();

  createForm: FormGroup;

  constructor(private animalsService: AnimalsService, private languageService: LanguageService) {
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
        // todo mirar el idFarm
        id: 1,
        location: null
      }
    }

    // Send object to database
    this.animalsService.createPlacing(newPlacing).subscribe(data => {
      // Emit success
      this.returnMsg.emit(this.languageService.msgs.createSuccess);
    }, error => {
      // Emit error
      this.returnMsg.emit(this.languageService.msgs.createError);
    })

  }

  /**
   * Update object on database
   */
  update() {

  }

  /**
   * Delete object on database
   */
  delete() {

  }

  /**
   * Cancel operation
   */
  cancel() {
    this.returnMsg.emit(null);
  }

}

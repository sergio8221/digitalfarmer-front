import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Msg, LanguageService } from 'src/app/services/language/language.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Placing } from 'src/app/services/animals/animals.service';
import { UsersService, User, Farm } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  @Output() returnMsg = new EventEmitter<Msg>();

  createForm: FormGroup;

  constructor(private usersService: UsersService,
    private languageService: LanguageService) {
    // Init form
    this.createForm = new FormGroup({
      email: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50),
        Validators.email
      ]),
      pass: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]),
      name: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      location: new FormControl('', [
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
    let newUser: User = {
      id: null,
      email: this.createForm.get('email').value,
      password: this.createForm.get('pass').value,
      name: this.createForm.get('name').value,
    };

    // Send object to database
    this.usersService.createUser(newUser).subscribe((data: User) => {
      // Create farm object
      let newFarm: Farm = {
        id: null,
        location: this.createForm.get('location').value,
        user: {
          id: data.id,
          email: null,
          name: null,
          password: null
        }
      }

      this.usersService.createFarm(newFarm).subscribe((data: Farm) => {
        // Emit success
        this.returnMsg.emit(this.languageService.msgs.createSuccess);
      }, error => {
        // Emit error
        this.returnMsg.emit(this.languageService.msgs.createError);
      })
    }, error => {
      // Emit error
      this.returnMsg.emit(this.languageService.msgs.createError);
    });

  }

  /**
   * Cancel operation
   */
  cancel() {
    this.returnMsg.emit(null);
  }

}

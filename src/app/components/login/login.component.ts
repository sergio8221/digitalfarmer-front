import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Msg } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class LoginComponent implements OnInit {

  /**
   * Login form
   */
  loginForm: FormGroup;

  /**
   * Login error message
   */
  errorMsg = '';

  /**
   * Is loading?
   */
  loading: boolean;

  //> Management

  /**
  * Show create modal
  */
  createModal: boolean;

  //> Messages

  /**
   * Message to show on msg-modal
   */
  msg: Msg;

  constructor(private router: Router, private authService: AuthService) {

    //Init form
    this.loginForm = new FormGroup({
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
      ])
    });

  }

  ngOnInit() {
  }

  /**
   * Attempt to log user in
   */
  login() {
    this.loading = true;
    this.authService.login(this.loginForm.get('email').value, this.loginForm.get('pass').value).subscribe(data => {
      this.router.navigate(['main']);
    }, error => {
      this.errorMsg = error;
      this.loading = false;
    });
  }

  //> Management

  /**
   * Open creation modal
   */
  openSignUp() {
    this.createModal = true;
  }

  /**
   * On modal close
   * @param msg Message returned
   */
  onModalReturn(msg: Msg) {
    this.createModal = false;

    if (msg) {
      // Show message
      this.showMessage(msg);
    }
  }

  /**
   * Show message modal
   * @param msg Message object
   */
  showMessage(msg: Msg) {
    this.msg = msg;
    // Set message to show
    setTimeout(() => {
      this.msg = null;
    }, 2000);
  }

}

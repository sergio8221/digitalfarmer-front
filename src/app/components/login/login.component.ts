import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

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

  constructor(private router: Router, private authService: AuthService) {

    //Init form
    this.loginForm = new FormGroup({
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
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
    this.router.navigate(['/main']);
  }

}

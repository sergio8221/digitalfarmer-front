import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { UsersService, User, LoginRequest } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private endpoint: string;

  // Current authenticated user
  public currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient, private router: Router, private userService: UsersService) {
    this.endpoint = environment.endpoint;

    // Get current user from session storage in case of a page reload
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  /**
   * Get current logged user
   */
  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  /**
   * Get token from auth service passing username and password
   * @param {string} username User's username
   * @param {string} password User's password
   */
  getToken(username: string, password: string) {
    return this.http.post<any>(this.endpoint + 'auth', JSON.stringify({ username, password }), { observe: 'response' })
      .pipe(map(res => {
        return res;
      }));
  }

  /**
   * Get user info using token requested in getToken() function
   * @param {string} email User's email
   * @param {string} password User's password
   */
  login(email: string, password: string) {
    // Return observable that emits value when token and user info have been recieved
    return Observable.create((observer: any) => {
      /* this.getToken(email, password).subscribe((resp: HttpResponse<any>) => {
        // Store empty user with token for interceptor to access it
        // in order to request user complete information
        let user: User = {
          id: null,
          email: null,
          password: null,
          name: null
        }
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);

        // Get real information for the user
        this.userService.getUserByEmail(email).subscribe((resp2: User) => {
          user = {
            id: resp2.id,
            email: resp2.email,
            name: resp2.name,
            password: null,
            token: resp.headers.get('authorization')
          }

          sessionStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);

          // Emit when user info is recieved
          observer.next();
        }, error => {
          observer.error('Error cargando usuario');
        });
      }, error => {
        observer.error('Credenciales erroneas');
      }); */

      let loginRequest: LoginRequest = { email: email, password: password };

      this.userService.loginUser(loginRequest).subscribe((user: User) => {
        sessionStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        observer.next();
      }, error => {
        observer.error('Credenciales erróneas');
      });


    });//Observable
  }

  /**
   * Remove user from session storage and currentUser object.
   * Redirects to login screen.
   */
  logout() {
    // Remove user from session storage to log user out
    sessionStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    // Redirect to login screen
    this.router.navigate(['login']);
  }
}
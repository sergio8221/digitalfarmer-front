import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { interval, throwError, of, Observable } from 'rxjs';
import { flatMap, retryWhen, map } from 'rxjs/operators';
import { Placing } from '../animals/animals.service';
import { FarmTask } from '../farm-tasks/farm-tasks.service';
import { Machine } from '../machinery/machinery.service';
import { Field } from '../crops/crops.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) {
    this.endpoint = environment.endpoint;
  }

  /* -----------------------------------------------------------------------
  !------------------------CURRENT DATA--------------------------------------
  --------------------------------------------------------------------------- */

  /**
   * Current loaded user
   */
  currUser: User;

  /**
   * Current loaded farm
   */
  currFarm: Farm = {
    id: 1,
    location: 'Valladolid'
  }

  /* -----------------------------------------------------------------------
  !--------------------------------AUX--------------------------------------
  --------------------------------------------------------------------------- */

  // Http connection configuration
  private endpoint: string;
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  /**
   * Extract response data
   * @param {Response} res Server response
   */
  private extractData(res: Response) {
    let body = res;
    return body || {};
  }

  /**
   * Retry request on error up to MAX_CON_RETRIES
   * @param param Request
   */
  private retry(param) {
    return interval(1000).pipe(
      flatMap(count => count === environment.MAX_CON_RETRIES ? throwError('Giving up') : of(count))
    );
  }

  /* -----------------------------------------------------------------------
  !------------------------------USERS------------------------------------
  --------------------------------------------------------------------------- */

  /*-----------GET--------- */
  public getAllUsers(): Observable<any> {
    return this.http.get(this.endpoint + 'users/').pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getUserById(idUser: number): Observable<any> {
    return this.http.get(this.endpoint + 'users/' + idUser).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  /*-----------POST--------- */
  public createUser(user: User) {
    return this.http.post<User>(this.endpoint + 'users/', JSON.stringify(user), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------UPDATE--------- */

  public updateUser(user: User) {
    return this.http.put<User>(this.endpoint + 'users/', JSON.stringify(user), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------DELETE--------- */

  public deleteUser(idUser: number) {
    return this.http.delete(this.endpoint + 'users/' + idUser)
      .pipe(map(res => {
        return res;
      }));
  }

  /* -----------------------------------------------------------------------
  !------------------------------FARMS------------------------------------
  --------------------------------------------------------------------------- */

  /*-----------GET--------- */
  public getAllFarms(): Observable<any> {
    return this.http.get(this.endpoint + 'farms/').pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getFarmById(idFarm: number): Observable<any> {
    return this.http.get(this.endpoint + 'farms/' + idFarm).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  /*-----------POST--------- */
  public createFarm(farm: Farm) {
    return this.http.post<Farm>(this.endpoint + 'farms/', JSON.stringify(farm), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------UPDATE--------- */

  public updateFarm(farm: Farm) {
    return this.http.put<Farm>(this.endpoint + 'farms/', JSON.stringify(farm), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------DELETE--------- */

  public deleteFarm(idFarm: number) {
    return this.http.delete(this.endpoint + 'farms/' + idFarm)
      .pipe(map(res => {
        return res;
      }));
  }

}

/**
 * Interface for User object
 */
export interface User {
  id: number,
  email: string,
  password: string,
  name: string,
  farm?: Farm
}

/**
 * Interface for Farm object
 */
export interface Farm {
  id: number,
  location: string,
  placings?: Placing[],
  farmTasks?: FarmTask[],
  machines?: Machine[],
  fields?: Field[]
}

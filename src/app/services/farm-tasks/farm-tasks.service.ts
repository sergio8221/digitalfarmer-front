import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { interval, throwError, of, Observable } from 'rxjs';
import { flatMap, retryWhen, map } from 'rxjs/operators';
import { Farm } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class FarmTasksService {

  constructor(private http: HttpClient) {
    this.endpoint = environment.endpoint;
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
  !------------------------------FARM-TASKS------------------------------------
  --------------------------------------------------------------------------- */

  /*-----------GET--------- */
  public getAlLFarmTasks(): Observable<any> {
    return this.http.get(this.endpoint + 'farmTasks/').pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getFarmTaskById(idFarmTask: number): Observable<any> {
    return this.http.get(this.endpoint + 'farmTasks/' + idFarmTask).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getFarmTaskByFarmId(idFarm: number): Observable<any> {
    return this.http.get(this.endpoint + 'farmTasks/farm/' + idFarm).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  /*-----------POST--------- */
  public createFarmTask(farmTask: FarmTask) {
    return this.http.post<FarmTask>(this.endpoint + 'farmTasks/', JSON.stringify(farmTask), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------UPDATE--------- */

  public updateFarmTask(farmTask: FarmTask) {
    return this.http.put<FarmTask>(this.endpoint + 'farmTasks/', JSON.stringify(farmTask), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------DELETE--------- */

  public deleteFarmTask(idFarmTask: number) {
    return this.http.delete(this.endpoint + 'farmTasks/' + idFarmTask)
      .pipe(map(res => {
        return res;
      }));
  }
}

export interface FarmTask {
  id: number,
  description: string,
  date: Date,
  completed: boolean,
  farm?: Farm
}

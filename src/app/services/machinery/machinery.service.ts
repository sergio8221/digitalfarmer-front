import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { interval, throwError, of, Observable } from 'rxjs';
import { flatMap, retryWhen, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MachineryService {

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
  !------------------------------MACHINERY------------------------------------
  --------------------------------------------------------------------------- */

  /*-----------GET--------- */
  public getAlLMachines(): Observable<any> {
    return this.http.get(this.endpoint + 'machines/').pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getMachineById(idMachine: number): Observable<any> {
    return this.http.get(this.endpoint + 'machines/' + idMachine).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  /*-----------POST--------- */
  public createMachine(machine: Machine) {
    return this.http.post<Machine>(this.endpoint + 'machines/', JSON.stringify(machine), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------UPDATE--------- */

  public updateMachine(machine: Machine) {
    return this.http.put<Machine>(this.endpoint + 'machines/', JSON.stringify(machine), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------DELETE--------- */

  public deleteMachine(idMachine: number) {
    return this.http.delete(this.endpoint + 'machines/' + idMachine)
      .pipe(map(res => {
        return res;
      }));
  }

  /* -----------------------------------------------------------------------
  !------------------------------MAINTENANCES------------------------------------
  --------------------------------------------------------------------------- */

  /*-----------GET--------- */
  public getAlLMaintenances(): Observable<any> {
    return this.http.get(this.endpoint + 'maintenances/').pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getMaintenanceById(idMaintenance: number): Observable<any> {
    return this.http.get(this.endpoint + 'maintenances/' + idMaintenance).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  /*-----------POST--------- */
  public createMaintenance(maintenance: Maintenance) {
    return this.http.post<Maintenance>(this.endpoint + 'maintenances/', JSON.stringify(maintenance), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------UPDATE--------- */

  public updateMaintenance(maintenance: Maintenance) {
    return this.http.put<Maintenance>(this.endpoint + 'maintenances/', JSON.stringify(maintenance), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------DELETE--------- */

  public deleteMaintenance(idMaintenance: number) {
    return this.http.delete(this.endpoint + 'maintenances/' + idMaintenance)
      .pipe(map(res => {
        return res;
      }));
  }

}

/**
 * Interface for Machine object
 */
export interface Machine {
  id: number,
  name: string,
  adquisition: Date,
  prize: number,
  maintenances?: Maintenance[]
}

/**
 * Interface for Maintenance object
 */
export interface Maintenance {
  id: number,
  description: string
}

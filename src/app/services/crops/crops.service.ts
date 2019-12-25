import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { interval, throwError, of, Observable } from 'rxjs';
import { flatMap, retryWhen, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CropsService {

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
  !------------------------------FIELDS------------------------------------
  --------------------------------------------------------------------------- */

  /*-----------GET--------- */
  public getAllFields(): Observable<any> {
    return this.http.get(this.endpoint + 'fields/').pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getFieldById(idField: number): Observable<any> {
    return this.http.get(this.endpoint + 'fields/' + idField).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  /*-----------POST--------- */
  public createField(field: Field) {
    return this.http.post<Field>(this.endpoint + 'fields/', JSON.stringify(field), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------UPDATE--------- */

  public updateField(field: Field) {
    return this.http.put<Field>(this.endpoint + 'fields/', JSON.stringify(field), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------DELETE--------- */

  public deleteField(idField: number) {
    return this.http.delete(this.endpoint + 'fields/' + idField)
      .pipe(map(res => {
        return res;
      }));
  }

  /* -----------------------------------------------------------------------
  !------------------------------SEASONS------------------------------------
  --------------------------------------------------------------------------- */

  /*-----------GET--------- */
  public getAllSeasons(): Observable<any> {
    return this.http.get(this.endpoint + 'seasons/').pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getSeasonById(idSeason: number): Observable<any> {
    return this.http.get(this.endpoint + 'seasons/' + idSeason).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  /*-----------POST--------- */
  public createSeason(season: Season) {
    return this.http.post<Season>(this.endpoint + 'seasons/', JSON.stringify(season), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------UPDATE--------- */

  public updateSeason(season: Season) {
    return this.http.put<Season>(this.endpoint + 'seasons/', JSON.stringify(season), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------DELETE--------- */

  public deleteSeason(idSeason: number) {
    return this.http.delete(this.endpoint + 'seasons/' + idSeason)
      .pipe(map(res => {
        return res;
      }));
  }

  /* -----------------------------------------------------------------------
  !------------------------------CROP-EVENTS------------------------------------
  --------------------------------------------------------------------------- */

  /*-----------GET--------- */
  public getAllCropEvents(): Observable<any> {
    return this.http.get(this.endpoint + 'cropEvents/').pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getCropEventById(idCropEvent: number): Observable<any> {
    return this.http.get(this.endpoint + 'cropEvents/' + idCropEvent).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  /*-----------POST--------- */
  public createCropEvent(cropEvent: CropEvent) {
    return this.http.post<CropEvent>(this.endpoint + 'cropEvents/', JSON.stringify(cropEvent), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------UPDATE--------- */

  public updateCropEvent(cropEvent: CropEvent) {
    return this.http.put<CropEvent>(this.endpoint + 'cropEvents/', JSON.stringify(cropEvent), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------DELETE--------- */

  public deleteCropEvent(idCropEvent: number) {
    return this.http.delete(this.endpoint + 'cropEvents/' + idCropEvent)
      .pipe(map(res => {
        return res;
      }));
  }

}

/**
 * Interface for Field object
 */
export interface Field {
  id: number,
  location: string,
  area: number,
  description: string,
  seasons?: Season[]
}

/**
 * Interface for Season object
 */
export interface Season {
  id: number,
  year: number,
  crop: string,
  description: string,
  cropEvents?: CropEvent[]
}

/**
 * Interface for CropEvent object
 */
export interface CropEvent {
  id: number,
  description: string,
  date: Date,
  moneySpent: number,
  moneyEarned: number
}

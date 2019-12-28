import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { interval, throwError, of, Observable } from 'rxjs';
import { retryWhen, flatMap, map } from 'rxjs/operators';
import { Farm } from '../users/users.service';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  constructor(private http: HttpClient) {
    this.endpoint = environment.endpoint;
  }

  /* -----------------------------------------------------------------------
  !------------------------CURRENT DATA--------------------------------------
  --------------------------------------------------------------------------- */

  /**
   * Selected placing to load animal list
   */
  selectedPlacingId: number;

  /* -----------------------------------------------------------------------
  !--------------------------FUNCTIONS--------------------------------------
  --------------------------------------------------------------------------- */

  /**
   * Calculate if animal is less than one year old
   * @param date Born date
   */
  isYoung(born: Date): boolean {
    let now = new Date();

    // If difference is less than a year return true
    if (((now.getTime() - born.getTime()) / (1000 * 60 * 60 * 24)) < 365) {
      return true;
    }

    return false;
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
  !------------------------------PLACINGS------------------------------------
  --------------------------------------------------------------------------- */

  /*-----------GET--------- */
  public getAllPlacings(): Observable<any> {
    return this.http.get(this.endpoint + 'placings/').pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getPlacingById(idPlacing: number): Observable<any> {
    return this.http.get(this.endpoint + 'placings/' + idPlacing).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  /*-----------POST--------- */
  public createPlacing(placing: Placing) {
    return this.http.post<Placing>(this.endpoint + 'placings/', JSON.stringify(placing), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------UPDATE--------- */

  public updatePlacing(placing: Placing) {
    return this.http.put<Placing>(this.endpoint + 'placings/', JSON.stringify(placing), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------DELETE--------- */

  public deletePlacing(idPlacing: number) {
    return this.http.delete(this.endpoint + 'placings/' + idPlacing)
      .pipe(map(res => {
        return res;
      }));
  }

  /* -----------------------------------------------------------------------
  !------------------------------ANIMALS------------------------------------
  --------------------------------------------------------------------------- */

  /*-----------GET--------- */
  public getAllAnimals(): Observable<any> {
    return this.http.get(this.endpoint + 'animals/').pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getAnimalById(idAnimal: number): Observable<any> {
    return this.http.get(this.endpoint + 'animals/' + idAnimal).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  /*-----------POST--------- */
  public createAnimal(animal: Animal) {
    return this.http.post<Animal>(this.endpoint + 'animals/', JSON.stringify(animal), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------UPDATE--------- */

  public updateAnimal(animal: Animal) {
    return this.http.put<Animal>(this.endpoint + 'animals/', JSON.stringify(animal), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------DELETE--------- */

  public deleteAnimal(idAnimal: number) {
    return this.http.delete(this.endpoint + 'animals/' + idAnimal)
      .pipe(map(res => {
        return res;
      }));
  }

  /* -----------------------------------------------------------------------
  !------------------------------SPECIES------------------------------------
  --------------------------------------------------------------------------- */

  /*-----------GET--------- */
  public getAllSpecies(): Observable<any> {
    return this.http.get(this.endpoint + 'species/').pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getSpeciesById(idSpecies: number): Observable<any> {
    return this.http.get(this.endpoint + 'species/' + idSpecies).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  /*-----------POST--------- */
  public createSpecies(species: Species) {
    return this.http.post<Species>(this.endpoint + 'species/', JSON.stringify(species), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------UPDATE--------- */

  public updateSpecies(species: Species) {
    return this.http.put<Species>(this.endpoint + 'species/', JSON.stringify(species), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------DELETE--------- */

  public deleteSpecies(idSpecies: number) {
    return this.http.delete(this.endpoint + 'species/' + idSpecies)
      .pipe(map(res => {
        return res;
      }));
  }

  /* -----------------------------------------------------------------------
  !------------------------------TREATMENTS------------------------------------
  --------------------------------------------------------------------------- */

  /*-----------GET--------- */
  public getAllTreatments(): Observable<any> {
    return this.http.get(this.endpoint + 'treatment/').pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getTreatmentById(idTreatment: number): Observable<any> {
    return this.http.get(this.endpoint + 'treatment/' + idTreatment).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  /*-----------POST--------- */
  public createTreatment(treatment: Treatment) {
    return this.http.post<Species>(this.endpoint + 'treatment/', JSON.stringify(treatment), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------UPDATE--------- */

  public updateTreatment(treatment: Treatment) {
    return this.http.put<Species>(this.endpoint + 'treatment/', JSON.stringify(treatment), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------DELETE--------- */

  public deleteTreatment(idTreatment: number) {
    return this.http.delete(this.endpoint + 'treatment/' + idTreatment)
      .pipe(map(res => {
        return res;
      }));
  }

}

/**
 * Interface for Placing object
 */
export interface Placing {
  id: number,
  name: string,
  animals?: Animal[],
  farm?: Farm
  summary?: PlacingSummary
}

/**
 * Interface for Animal object
 */
export interface Animal {
  id: number,
  name: string,
  code: string,
  born: Date,
  sex: string,
  species?: Species,
  treatments?: Treatment[],
  placing?: Placing,
  health?: number
}

/**
 * Interface for Species object
 */
export interface Species {
  id: number,
  name: string
}

/**
 * Interface for Treatment object
 */
export interface Treatment {
  id: number,
  description: string
}

/**
 * Placing summary
 */
export interface PlacingSummary {
  animals: number,
  youngs: number,
  male: number,
  female: number,
  ill: number
}

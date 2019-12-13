import { Injectable } from '@angular/core';
import { Animal } from 'src/app/interfaces/animals.interface';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { interval, throwError, of, Observable } from 'rxjs';
import { retryWhen, flatMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  constructor(private http: HttpClient) {
    this.endpoint = environment.endpoint + 'animals/';
  }

  /**
   * List of animals
   */
  animalList: Animal[] = [
    {
      id: 1,
      name: 'Bonita',
      code: '75639',
      species: 'cow',
      born: new Date(),
      sex: 'Hembra',
      placing: 'Estabulado',
      health: 'En tratamiento'
    },
    {
      id: 2,
      name: null,
      code: '45213',
      species: 'pig',
      born: new Date(),
      sex: 'Hembra',
      placing: 'Estabulado',
      health: 'Saludable'
    },
    {
      id: 3,
      name: 'Preciosa',
      code: null,
      species: 'cow',
      born: new Date(),
      sex: 'Hembra',
      placing: 'En pasto',
      health: 'Saludable'
    },
    {
      id: 4,
      name: 'Lucero',
      code: '42234',
      species: 'horse',
      born: new Date(),
      sex: 'Macho',
      placing: 'En pasto',
      health: 'Saludable'
    },
    {
      id: 5,
      name: 'Jeremías',
      code: '78521',
      species: 'cow',
      born: new Date(),
      sex: 'Macho',
      placing: 'En pasto',
      health: 'En tratamiento'
    },
    {
      id: 6,
      name: 'Rocky',
      code: null,
      species: 'dog',
      born: new Date(),
      sex: 'Macho',
      placing: 'En pasto',
      health: 'Saludable'
    },
    {
      id: 7,
      name: 'Jacko',
      code: null,
      species: 'dog',
      born: new Date(),
      sex: 'Macho',
      placing: 'En pasto',
      health: 'Saludable'
    },
    {
      id: 8,
      name: null,
      code: '1234',
      species: 'hen',
      born: new Date(),
      sex: 'Macho',
      placing: 'En pasto',
      health: 'En tratamiento'
    },
    {
      id: 9,
      name: null,
      code: '786546',
      species: 'pig',
      born: new Date(),
      sex: 'Hembra',
      placing: 'Estabulado',
      health: 'En tratamiento'
    },
    {
      id: 10,
      name: 'Copito',
      code: '45621',
      species: 'sheep',
      born: new Date(),
      sex: 'Macho',
      placing: 'En pasto',
      health: 'En tratamiento'
    },
  ]

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
  !------------------------------ANIMALS------------------------------------
  --------------------------------------------------------------------------- */

  /*-----------GET--------- */
  public getAll(): Observable<any> {
    return this.http.get(this.endpoint).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  public getById(idAnimal: number): Observable<any> {
    return this.http.get(this.endpoint + idAnimal).pipe(retryWhen(this.retry)).pipe(map(this.extractData));
  }

  /*-----------POST--------- */
  public create(animal: AnimalDB) {
    return this.http.post<AnimalDB>(this.endpoint, JSON.stringify(animal), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------UPDATE--------- */

  public update(animal: AnimalDB) {
    return this.http.put<AnimalDB>(this.endpoint, JSON.stringify(animal), this.httpOptions)
      .pipe(map(res => {
        return res;
      }));
  }

  /*-----------DELETE--------- */

  public delete(idAnimal: number) {
    return this.http.delete(this.endpoint + idAnimal)
      .pipe(map(res => {
        return res;
      }));
  }

}

export interface AnimalDB {
  id: number,
  name: string,
  code: string,
  born: Date,
  sex: string,
  idSpecies: number,
  idPlacing: number
}

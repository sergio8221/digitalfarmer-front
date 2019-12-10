import { Injectable } from '@angular/core';
import { Animal } from 'src/app/interfaces/animals.interface';

@Injectable({
  providedIn: 'root'
})
export class AnimalsService {

  constructor() { }

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
}

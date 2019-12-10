import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/interfaces/animals.interface';
import { AnimalsService } from 'src/app/services/animals/animals.service';

@Component({
  selector: 'app-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class AnimalsListComponent implements OnInit {

  /**
   * Show filters?
   */
  showFilters: boolean;

  /**
   * Expand animal card?
   */
  expandAnimalId: number;

  /**
   * List of animals loaded
   */
  animalList: Animal[];

  constructor(private animalsService: AnimalsService) {
    this.showFilters = false;
  }

  ngOnInit() {
    this.animalList = this.animalsService.animalList;
  }

  /**
   * Toggle filters section
   */
  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

  /**
   * Expand clicked animal card
   * @param idAnimal Animal id
   */
  expandAnimal(idAnimal: number) {
    this.expandAnimalId = (this.expandAnimalId != idAnimal) ? idAnimal : -1;
  }

}

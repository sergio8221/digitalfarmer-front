import { Component, OnInit } from '@angular/core';
import { AnimalsService, Animal, Placing } from 'src/app/services/animals/animals.service';

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
   * Loaded placings
   */
  placings: Placing[];

  /**
   * List of animals loaded
   */
  animalList: Animal[];

  constructor(private animalsService: AnimalsService) {
    this.showFilters = false;
  }

  ngOnInit() {
    this.loadPlacings();
  }

  loadPlacings() {
    // Reset placings list
    this.placings = [];

    // Load placings depending on selected
    if (!this.animalsService.selectedPlacingId || this.animalsService.selectedPlacingId == 0) {
      this.animalsService.getAllPlacings().subscribe((data: Placing[]) => {
        this.placings = data;
        this.parseAnimals();
      });
    } else {
      this.animalsService.getPlacingById(this.animalsService.selectedPlacingId).subscribe((data: Placing) => {
        this.placings.push(data);
        this.parseAnimals();
      })
    }
  }

  parseAnimals() {
    // Reset animals list
    this.animalList = [];

    // Parse animals list from placings
    this.placings.forEach(placing => {
      placing.animals.forEach(animal => {
        // Save placing info on animal object
        animal.placing = {
          id: placing.id,
          name: placing.name
        };

        // todo Update animal health info
        animal.health = 0;
        if (animal.treatments && animal.treatments.length > 0) {
          animal.health = 1;
        }

        //Add animal to list
        this.animalList.push(animal);
      });
    });
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

import { Component, OnInit } from '@angular/core';
import { AnimalsService, Animal, Placing } from 'src/app/services/animals/animals.service';
import { Msg } from 'src/app/services/language/language.service';

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

  //> Management

  /**
  * Show create modal
  */
  createModal: boolean;

  /**
   * Object to update
   */
  objectUpdate: Animal;

  //> Messages

  /**
   * Message to show on msg-modal
   */
  msg: Msg;

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

  //> Management

  /**
   * Open creation modal
   */
  create() {
    this.objectUpdate = null;
    this.createModal = true;
  }

  /**
   * Open update modal
   * @param animal Object to update
   */
  update($event: MouseEvent, animal: Animal) {
    $event.stopPropagation();
    this.objectUpdate = animal;
    this.createModal = true;
  }

  /**
   * On modal close
   * @param msg Message returned
   */
  onModalReturn(msg: Msg) {
    this.createModal = false;
    this.objectUpdate = null;

    if (msg) {
      // Reload updated info
      this.loadPlacings();

      // Show message
      this.showMessage(msg);
    }
  }

  /**
   * Show message modal
   * @param msg Message object
   */
  showMessage(msg: Msg) {
    this.msg = msg;
    // Set message to show
    setTimeout(() => {
      this.msg = null;
    }, 2000);
  }

}

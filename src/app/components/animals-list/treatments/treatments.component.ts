import { Component, OnInit } from '@angular/core';
import { Treatment, AnimalsService } from 'src/app/services/animals/animals.service';
import { Msg } from 'src/app/services/language/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-treatments',
  templateUrl: './treatments.component.html',
  styleUrls: ['./treatments.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class TreatmentsComponent implements OnInit {

  /**
   * Expand treatment card?
   */
  expandTreatmentId: number;

  /**
   * Loaded treatments
   */
  treatments: Treatment[];

  //> Management

  /**
  * Show create modal
  */
  createModal: boolean;

  /**
   * Object to update
   */
  objectUpdate: Treatment;

  //> Messages

  /**
   * Message to show on msg-modal
   */
  msg: Msg;

  constructor(private animalsService: AnimalsService, private router: Router) { }

  ngOnInit() {
    if (this.animalsService.selectedAnimalId) {
      this.loadTreatments(this.animalsService.selectedAnimalId);
    } else {
      this.router.navigate(['main']);
    }

  }

  /**
   * Load treatments for an animal
   * @param idAnimal Animal id
   */
  loadTreatments(idAnimal: number) {
    // Init treatments array
    this.treatments = undefined;

    // Load from database
    this.animalsService.getTreatmentsByAnimalId(idAnimal).subscribe((data: Treatment[]) => {
      this.treatments = data;
    })
  }

  /**
   * Expand clicked treatment card
   * @param idTreatment treatment id
   */
  expandTreatment(idTreatment: number) {
    this.expandTreatmentId = (this.expandTreatmentId != idTreatment) ? idTreatment : -1;
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
   * @param treatment Object to update
   */
  update($event: MouseEvent, treatment: Treatment) {
    $event.stopPropagation();
    this.objectUpdate = treatment;
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
      this.loadTreatments(this.animalsService.selectedAnimalId);

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

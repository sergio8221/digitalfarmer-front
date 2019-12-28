import { Component, OnInit } from '@angular/core';
import { Placing, AnimalsService } from 'src/app/services/animals/animals.service';
import { Router } from '@angular/router';
import { Msg } from 'src/app/services/language/language.service';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class AnimalsComponent implements OnInit {

  /**
   * Placings loaded
   */
  placings: Placing[];

  /**
  * Show create modal
  */
  createModal: boolean;

  /**
   * Placing to update
   */
  placingUpdate: Placing;

  /**
   * Message to show on msg-modal
   */
  msg: Msg;

  constructor(private animalsService: AnimalsService, private router: Router) { }

  ngOnInit() {
    //Get placings
    this.loadPlacings();
  }

  /**
   * Load placings form database
   */
  loadPlacings() {
    this.animalsService.getAllPlacings().subscribe((data: Placing[]) => {
      this.placings = data;
    });
  }

  /**
   * Select placing
   * @param idPlacing Id of placing selected
   */
  selectPlacing(idPlacing: number) {
    this.animalsService.selectedPlacingId = idPlacing;
    this.router.navigate(['animals-list']);
  }

  /**
   * Open creation modal
   */
  create() {
    this.placingUpdate = null;
    this.createModal = true;
  }

  /**
   * Open update modal
   * @param placing Object to update
   */
  update($event: MouseEvent, placing: Placing) {
    $event.stopPropagation();
    this.placingUpdate = placing;
    this.createModal = true;
  }

  /**
   * On modal close
   * @param msg Message returned
   */
  onModalReturn(msg: Msg) {
    this.createModal = false;
    this.placingUpdate = null;

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

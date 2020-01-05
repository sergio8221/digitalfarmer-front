import { Component, OnInit } from '@angular/core';
import { Msg } from 'src/app/services/language/language.service';
import { CropsService, CropEvent } from 'src/app/services/crops/crops.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crop-events',
  templateUrl: './crop-events.component.html',
  styleUrls: ['./crop-events.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class CropEventsComponent implements OnInit {

  /**
   * Expand card?
   */
  expandEventId: number;

  /**
   * Loaded events
   */
  events: CropEvent[];

  //> Management

  /**
  * Show create modal
  */
  createModal: boolean;

  /**
   * Object to update
   */
  objectUpdate: CropEvent;

  //> Messages

  /**
   * Message to show on msg-modal
   */
  msg: Msg;

  constructor(private cropsService: CropsService, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    if (this.cropsService.selectedSeasonId) {
      this.loadEvents(this.cropsService.selectedSeasonId);
    } else {
      this.router.navigate(['main']);
    }
  }

  /**
   * Load events
   * @param idSeason Season id
   */
  loadEvents(idSeason: number) {
    // Init array
    this.events = undefined;

    // Load from database
    this.cropsService.getCropEventsBySeasonId(idSeason).subscribe((data: CropEvent[]) => {
      this.events = data;
    })
  }

  /**
   * Expand clicked card
   * @param idEvent event id
   */
  expandEvent(idEvent: number) {
    this.expandEventId = (this.expandEventId != idEvent) ? idEvent : -1;
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
   * @param event Object to update
   */
  update($event: MouseEvent, event: CropEvent) {
    $event.stopPropagation();
    this.objectUpdate = event;
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
      this.loadEvents(this.cropsService.selectedSeasonId);

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

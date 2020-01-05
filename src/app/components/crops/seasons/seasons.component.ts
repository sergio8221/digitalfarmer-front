import { Component, OnInit } from '@angular/core';
import { Season, CropsService } from 'src/app/services/crops/crops.service';
import { Msg } from 'src/app/services/language/language.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seasons',
  templateUrl: './seasons.component.html',
  styleUrls: ['./seasons.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class SeasonsComponent implements OnInit {

  /**
   * Expand card?
   */
  expandSeasonId: number;

  /**
   * Loaded seasons
   */
  seasons: Season[];

  //> Management

  /**
  * Show create modal
  */
  createModal: boolean;

  /**
   * Object to update
   */
  objectUpdate: Season;

  //> Messages

  /**
   * Message to show on msg-modal
   */
  msg: Msg;

  constructor(private cropsService: CropsService, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    if (this.cropsService.selectedFieldId) {
      this.loadSeasons(this.cropsService.selectedFieldId);
    } else {
      this.router.navigate(['main']);
    }
  }

  /**
   * Load seasons
   * @param idField Field id
   */
  loadSeasons(idField: number) {
    // Init array
    this.seasons = undefined;

    // Load from database
    this.cropsService.getSeasonsByFieldId(idField).subscribe((data: Season[]) => {
      this.seasons = data;
    })
  }

  /**
   * Expand clicked card
   * @param idSeason season id
   */
  expandSeason(idSeason: number) {
    this.expandSeasonId = (this.expandSeasonId != idSeason) ? idSeason : -1;
  }

  /**
   * Show events of a season
   * @param idSeason Id of season
   */
  showEvents($event: MouseEvent, idSeason: number) {
    $event.stopPropagation();
    this.cropsService.selectedSeasonId = idSeason;
    this.router.navigate(['events']);
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
   * @param season Object to update
   */
  update($event: MouseEvent, season: Season) {
    $event.stopPropagation();
    this.objectUpdate = season;
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
      this.loadSeasons(this.cropsService.selectedFieldId);

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

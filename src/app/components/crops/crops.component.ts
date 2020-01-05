import { Component, OnInit } from '@angular/core';
import { Field, CropsService } from 'src/app/services/crops/crops.service';
import { Msg } from 'src/app/services/language/language.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crops',
  templateUrl: './crops.component.html',
  styleUrls: ['./crops.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class CropsComponent implements OnInit {

  /**
   * Expand card?
   */
  expandFieldId: number;

  /**
   * Loaded fields
   */
  fields: Field[];

  //> Management

  /**
  * Show create modal
  */
  createModal: boolean;

  /**
   * Object to update
   */
  objectUpdate: Field;

  //> Messages

  /**
   * Message to show on msg-modal
   */
  msg: Msg;

  constructor(private cropsService: CropsService, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    if (this.usersService.currFarm && this.usersService.currFarm.id) {
      this.loadFields(this.usersService.currFarm.id);
    } else {
      this.router.navigate(['main']);
    }
  }

  /**
   * Load fields
   * @param idFarm Farm id
   */
  loadFields(idFarm: number) {
    // Init array
    this.fields = undefined;

    // Load from database
    this.cropsService.getFieldsByFarmId(idFarm).subscribe((data: Field[]) => {
      this.fields = data;
    })
  }

  /**
   * Expand clicked field card
   * @param idField field id
   */
  expandField(idField: number) {
    this.expandFieldId = (this.expandFieldId != idField) ? idField : -1;
  }

  /**
   * Show seasons of a field
   * @param idField Id of field
   */
  showSeasons($event: MouseEvent, idField: number) {
    $event.stopPropagation();
    this.cropsService.selectedFieldId = idField;
    this.router.navigate(['seasons']);
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
   * @param field Object to update
   */
  update($event: MouseEvent, field: Field) {
    $event.stopPropagation();
    this.objectUpdate = field;
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
      this.loadFields(this.usersService.currFarm.id);

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

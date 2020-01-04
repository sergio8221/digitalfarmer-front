import { Component, OnInit } from '@angular/core';
import { Maintenance, MachineryService } from 'src/app/services/machinery/machinery.service';
import { Msg } from 'src/app/services/language/language.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-maintenances',
  templateUrl: './maintenances.component.html',
  styleUrls: ['./maintenances.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class MaintenancesComponent implements OnInit {

  /**
   * Expand card?
   */
  expandMaintenanceId: number;

  /**
   * Loaded maintenances
   */
  maintenances: Maintenance[];

  //> Management

  /**
  * Show create modal
  */
  createModal: boolean;

  /**
   * Object to update
   */
  objectUpdate: Maintenance;

  //> Messages

  /**
   * Message to show on msg-modal
   */
  msg: Msg;

  constructor(private machineryService: MachineryService, private router: Router) { }

  ngOnInit() {
    if (this.machineryService.selectedMachineId) {
      this.loadMaintenances(this.machineryService.selectedMachineId);
    } else {
      this.router.navigate(['main']);
    }
  }

  /**
   * Load maintenances
   * @param idMachine Machine id
   */
  loadMaintenances(idMachine: number) {
    // Init array
    this.maintenances = undefined;

    // Load from database
    this.machineryService.getMaintenancesByMachineId(idMachine).subscribe((data: Maintenance[]) => {
      this.maintenances = data;
    })
  }

  /**
   * Expand clicked card
   * @param idMaintenance treatment id
   */
  expandMaintenance(idMaintenance: number) {
    this.expandMaintenanceId = (this.expandMaintenanceId != idMaintenance) ? idMaintenance : -1;
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
   * @param maintenance Object to update
   */
  update($event: MouseEvent, maintenance: Maintenance) {
    $event.stopPropagation();
    this.objectUpdate = maintenance;
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
      this.loadMaintenances(this.machineryService.selectedMachineId);

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

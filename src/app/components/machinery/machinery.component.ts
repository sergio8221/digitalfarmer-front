import { Component, OnInit } from '@angular/core';
import { Machine, MachineryService } from 'src/app/services/machinery/machinery.service';
import { Msg } from 'src/app/services/language/language.service';
import { UsersService } from 'src/app/services/users/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-machinery',
  templateUrl: './machinery.component.html',
  styleUrls: ['./machinery.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class MachineryComponent implements OnInit {

  /**
   * Expand card?
   */
  expandMachineId: number;

  /**
   * Loaded machines
   */
  machines: Machine[];

  //> Management

  /**
  * Show create modal
  */
  createModal: boolean;

  /**
   * Object to update
   */
  objectUpdate: Machine;

  //> Messages

  /**
   * Message to show on msg-modal
   */
  msg: Msg;

  constructor(private machineryService: MachineryService, private usersService: UsersService, private router: Router) { }

  ngOnInit() {
    if (this.usersService.currFarm.id) {
      this.loadMachines(this.usersService.currFarm.id);
    } else {
      this.router.navigate(['main']);
    }
  }

  /**
   * Load machines
   * @param idFarm Farm id
   */
  loadMachines(idFarm: number) {
    // Init array
    this.machines = undefined;

    // Load from database
    this.machineryService.getMachinesByFarmId(idFarm).subscribe((data: Machine[]) => {
      this.machines = data;
    })
  }

  /**
   * Expand clicked machine card
   * @param idMachine machine id
   */
  expandMachine(idMachine: number) {
    this.expandMachineId = (this.expandMachineId != idMachine) ? idMachine : -1;
  }

  /**
   * Show maintenances of a machine
   * @param idMachine Id of machine
   */
  showMaintenances($event: MouseEvent, idMachine: number) {
    $event.stopPropagation();
    this.machineryService.selectedMachineId = idMachine;
    this.router.navigate(['maintenances']);
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
   * @param machine Object to update
   */
  update($event: MouseEvent, machine: Machine) {
    $event.stopPropagation();
    this.objectUpdate = machine;
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
      this.loadMachines(this.usersService.currFarm.id);

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

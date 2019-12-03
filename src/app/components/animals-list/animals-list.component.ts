import { Component, OnInit } from '@angular/core';

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
  expandAnimal: boolean;

  constructor() {
    this.showFilters = false;
    this.expandAnimal = false;
  }

  ngOnInit() {
  }

  /**
   * Toggle filters section
   */
  toggleFilters() {
    this.showFilters = !this.showFilters;
  }

}

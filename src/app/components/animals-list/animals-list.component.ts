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

  constructor() {
    this.showFilters = false;
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

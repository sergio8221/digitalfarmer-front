import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class AnimalsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}

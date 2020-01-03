import { Component, OnInit } from '@angular/core';
import { trigger, transition, query, style, stagger, animate } from '@angular/animations';
import { AnimalsService } from 'src/app/services/animals/animals.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  host: {
    class: 'app-screen'
  }
})
export class MainComponent implements OnInit {

  constructor(private animalsService: AnimalsService) { }

  ngOnInit() {
    // todo
    this.animalsService.selectedFarmId = 1;
  }

}

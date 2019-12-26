import { Component } from '@angular/core';
import { Location } from "@angular/common";
import { Router, RouterOutlet } from '@angular/router';
import { trigger, transition, group, query, style, animate } from '@angular/animations';

// Animations
const trans = [
  group([
    query(':enter', [ // the new page
      style({ opacity: 0 }),
      animate('500ms linear', style({ opacity: 1 }))
    ], { optional: true }),
    query(':leave', [ // the old page
      style({ opacity: 1 }),
      animate('500ms linear', style({ opacity: 0 }))
    ], { optional: true })
  ])
];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger('routeAnimations', [
      transition('* => *', trans)
    ]),
  ]
})
export class AppComponent {
  title = 'digitalfarmer-front';

  /**
   * Current route on outlet
   */
  currRoute: string;

  constructor(location: Location, router: Router) {
    router.events.subscribe(val => {
      if (location.path()) {
        this.currRoute = location.path();
      }
    })
  }

  /**
   * Prepare route for animations
   * @param outlet Router outlet
   */
  prepareRoute(outlet: RouterOutlet) {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation'];
  }
}

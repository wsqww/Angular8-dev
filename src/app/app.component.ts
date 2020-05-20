import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { PageAnimations } from '@shared/animations/page.animations';

@Component({
  selector: 'app-root',
  template: `
    <div class="page">
      <div class="page-left">
        <app-sub-menu></app-sub-menu>
      </div>
      <div class="page-main" [@routeAnimations]="animationRoute(outletInfo)">
          <router-outlet #outletInfo="outlet"></router-outlet>
      </div>
    </div>
  `,
  styles: [
    `.page {
      max-width: 1200px;
      height: 100%;
      margin: 0 auto;
      display: flex;
      background-color: #fff;
    }
    .page>.page-left {
        width: 220px;
        height: 100%;
        overflow: auto;
        border-right: 1px solid #000;
    }
    .page>.page-main {
      flex: 1;
    }`,
  ],
  animations: [PageAnimations]
})
export class AppComponent {
  constructor(
    // private router: Router
  ) { }

  animationRoute(outlet: RouterOutlet) {
    // console.log(outlet.activatedRouteData);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}

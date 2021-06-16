import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Router, ActivatedRoute, NavigationError, NavigationEnd } from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';

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
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private titleSer: Title,
  ) {
    this.router.events.pipe(
      filter(event => {
        // 其他事件 在此处 处理
        if (event instanceof NavigationError) {
          // console.log(event);
          // 代码build上线之后-懒加载报错chunkLoadError, 拦截错误 刷新页面
          const chunkFailedMessage = /Loading chunk [\d]+ failed/;
          if (chunkFailedMessage.test(event.error.message)) {
            window.location.href = event.url;
          }
        }
        // 返回 导航结束 事件
        return event instanceof NavigationEnd;
      }),
      map(() => this.activatedRoute), // 当前激活路由
      map(route => {
        // console.log(route);
        // 遍历路由表以获取到每一个页面对应的路由信息
        while (route.firstChild) { route = route.firstChild; }
        return route;
      }),
      filter(route => route.outlet === 'primary'),
      mergeMap(route => route.data)
    ).subscribe(
      (data) => {
        // console.log(data);
        const oldTitle = this.titleSer.getTitle();
        const signIndex = oldTitle.indexOf('|');
        const titlePrefix = signIndex > -1 ? oldTitle.substring(0, signIndex + 2) : `${oldTitle} | `;
        const newTitle = `${titlePrefix}${data.title ? data.title : ''}`;
        this.titleSer.setTitle(newTitle);
      }
    );
  }

  animationRoute(outlet: RouterOutlet) {
    // console.log(outlet.activatedRouteData);
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Meta } from '@angular/platform-browser';

@Component({
  selector: 'app-h5',
  template: `<div class="h5"><router-outlet></router-outlet></div>`,
  styles: [`.h5 { font-size: .16rem;}`],
})
export class H5Component implements OnInit, OnDestroy {
  constructor(private meta: Meta) {}

  ngOnInit() {
    this.meta.addTag({
      id: 'mobile',
      name: 'viewport',
      content: 'width=device-width, minimum-scale=1, initial-scale=1, shrink-to-fit=no'
    });
    this.flexble();
  }

  ngOnDestroy() {
    this.flexble(false);
    this.meta.removeTag('id=mobile');
  }

  /**
   * 是否启用窗口 且改变字体大小
   * @param status 窗口监听状态
   */
  flexble(status: boolean = true) {
    const docEl = document.documentElement;
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    if (!document.addEventListener) { return; }
    if (status) {
      this.recalc();
      window.addEventListener(resizeEvt, this.recalc, false);
      document.addEventListener('DOMContentLoaded', this.recalc, false);
    } else {
      docEl.style.fontSize = '16px';
      window.removeEventListener(resizeEvt, this.recalc, false);
      document.removeEventListener('DOMContentLoaded', this.recalc, false);
    }
  }

  /**
   * 重新计算
   */
  recalc() {
    const docEl = document.documentElement;
    const clientWidth = docEl.clientWidth;
    if (!clientWidth) { return; }
    if (clientWidth >= 750) {
      docEl.style.fontSize = '100px';
    } else {
      docEl.style.fontSize = clientWidth * 200 / 750 + 'px';
    }
  }

}

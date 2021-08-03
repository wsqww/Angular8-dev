import { Component, OnInit, AfterViewInit } from "@angular/core";
import {MathQuillLoader} from 'ngx-mathquill';

import { data } from './data';

@Component({
  selector: "app-mathquill",
  templateUrl: "./mathquill.component.html",
  styleUrls: ["./mathquill.component.scss"],
})
export class MathquillComponent implements OnInit, AfterViewInit {
  constructor() {}

  public text = '';

  ngOnInit() {
    console.log(data);
    this.text = data.html;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      MathQuillLoader.loadMathQuill(mathquill => {
        const MQ = mathquill.getInterface(2);
        const box = document.getElementById('box');
        const target = box.querySelectorAll('[id^=insert-formula]');
        // console.log(target);
        target.forEach((item: HTMLElement) => {
          // console.log(item);
          MQ.StaticMath(item);
        });
      });
    }, 0);
  }
}

import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';


// ------ module.ts 需要引入 以下模块 ------
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
// ------ ------------------------ ------

@Component({
  selector: 'app-animation',
  animations: [
    trigger('openClose', [
      state('open', style({
        height: '200px',
        opacity: 1,
        backgroundColor: 'yellow'
      })),
      state('closed', style({
        height: '100px',
        opacity: 0.5,
        backgroundColor: 'green'
      })),
      transition('closed <=> open', [
        animate('0.5s')
      ]),
    ]),
  ],
  templateUrl: './animation.component.html',
  styleUrls: ['./animation.component.scss']
})
export class AnimationComponent implements OnInit {

  constructor() { }

  public isOpen = true;

  ngOnInit() {
  }

  toggle() {
    this.isOpen = !this.isOpen;
  }

}

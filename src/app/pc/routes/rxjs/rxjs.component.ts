import { Component, OnInit, AfterViewInit } from "@angular/core";
// RxJs v6+
import { Observable, fromEvent, of } from "rxjs";
import { map, takeUntil, concatAll } from "rxjs/operators";

/**
 * 首先畫面上有一個元件(#drag)
 * 當滑鼠在元件(#drag)上按下左鍵(mousedown)時，開始監聽滑鼠移動(mousemove)的位置
 * 當滑鼠左鍵放掉(mouseup)時，結束監聽滑鼠移動
 * 當滑鼠移動(mousemove)被監聽時，跟著修改元件的樣式屬性
 */

@Component({
  selector: "app-rxjs",
  templateUrl: "./rxjs.component.html",
  styleUrls: ["./rxjs.component.scss"],
})
export class RxjsComponent implements OnInit, AfterViewInit {
  constructor() {}

  ngOnInit() {
    // --- RxJs 操作符  ----------------------------
    this.create();
    this.of();
    // --------------------------------------------
  }

  ngAfterViewInit() {
    this.drag();
  }

  // ----- RxJs操作符 ----------------------------------------------------

  create() {
    const source = new Observable(observer => {
      observer.next('Jerry');
      observer.next('Anna');
      observer.complete();
    });

    this.obsSub(source, 'cerate');
  }

  of() {
    const source = of('Jerry', 'Anna');

    this.obsSub(source, 'of');
  }

  // observable.subscribe
  obsSub(obs, msg = '') {
    console.log(`- ${msg} >>>>>>>>>>`);
    obs.subscribe({
      next: (value) => {
        console.log(value);
      },
      complete: () => {
        console.log('complete!');
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  /**
   * 拖拽
   */
  drag() {
    const dragDOM = document.getElementById("drag");
    const body = document.body;

    const mouseDown = fromEvent(dragDOM, "mousedown");
    const mouseUp = fromEvent(body, "mouseup");
    const mouseMove = fromEvent(body, "mousemove");

    mouseDown
      .pipe(
        map((event) => mouseMove.pipe(takeUntil(mouseUp))),
        concatAll()
      )
      .subscribe((pos: MouseEvent) => {
        // console.log(pos);
        dragDOM.style.left = pos.clientX + "px";
        dragDOM.style.top = pos.clientY + "px";
      });
  }

  // --------------------------------------------------------------------
}

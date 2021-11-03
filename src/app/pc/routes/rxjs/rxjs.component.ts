import { Component, OnInit, AfterViewInit } from '@angular/core';
// RxJs v6+
import { Observable, fromEvent, of, interval, EMPTY, from, range, combineLatest, zip, Subject, ReplaySubject, BehaviorSubject } from 'rxjs';
import { map, switchMap, take, concatAll, concatMap, takeUntil, mapTo, mergeMap, pluck, scan, repeat, buffer, debounceTime, throttleTime, distinct, filter, first, skip, mergeAll, startWith, share } from 'rxjs/operators';

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
  }

  ngAfterViewInit() {
    // this.drag();
  }

  // ----- RxJs操作符 ----------------------------------------------------

  // 创建 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  mCreate() {
    const source = new Observable(observer => {
      observer.next('Jerry');
      observer.next('Anna');
      observer.complete();
    });

    this.obsSub(source, 'cerate');
  }

  // 从一个数组、类数组对象、Promise、迭代器对象或者类 Observable 对象创建一个 Observable.
  mFrom() {
    const source = from([10, 20, 30]);
    this.obsSub(source, 'from');
  }

  // 创建一个 Observable，该 Observable 发出来自给定事件对象的指定类型事件。可用于浏览器环境中的Dom事件或Node环境中的EventEmitter事件等。
  mFromEvent() {
    const source = fromEvent(document.getElementById('fromEvent'), 'click');
    this.obsSub(source, 'fromEvent');
  }

  // 将Promise转换成Observable， rxjs v6 之后不再 将 fromPromise 作为公共的 Api，而是放在 from 中
  mFromPromise() {
    const mPromise = new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('my promise');
      }, 1500);
    });
    const source = from(mPromise);
    this.obsSub(source, 'fromPromise');
  }

  // 使用该操作符创建的Observable可以在指定时间内发出连续的数字
  mInterval() {
    const source = interval(1000);
    this.obsSub(source, 'interval');
  }

  // 与from的能力差不太多，只不过在使用的时候是传入一个一个参数来调用的，有点类似于js中的concat方法
  mOf() {
    const source = of('Jerry', 'Anna');
    this.obsSub(source, 'of');
  }

  // 将数据源重复n次，n为你传入的数字类型参数。
  mRepeat() {
    // const source = of(1, 2, 3).pipe( repeat(3) );
    const source = interval(1000).pipe( take(3), repeat(3) );
    this.obsSub(source, 'repeat');
  }

  // 创建一个 Observable ，它发出指定范围内的数字序列
  mRange() {
    const source = range(1, 6);
    this.obsSub(source, 'range');
  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // 转换操作符 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // 将过往的值收集到一个数组中，并且仅当另一个 Observable 发出通知时才发出此数组。这相当于有一个缓冲区，将数据收集起来，等到一个信号来临，再释放出去。
  mBuffer() {
    const source = interval(500);
    this.obsSub(source, 'buffer source');
    const click = fromEvent(document.getElementById('bufferEnd'), 'click');
    const result = source.pipe( buffer(click) );
    this.obsSub(result, 'buffer');
  }

  // 参考 js中数组的map方法
  mMap() {
    const source = interval(1000).pipe( take(3) );
    const result = source.pipe( map(data => data * 2 ) );
    this.obsSub(result, 'map');
  }

  // 忽略数据源发送的数据，只发送指定的值（传参）
  mMapTo() {
    const source = interval(1000).pipe( take(3) );
    const result = source.pipe( mapTo('mapTo') );
    this.obsSub(result, 'mapTo');
  }

  // mergeMap主要做了一个整合的能力，我们可以将它与map进行对比，我们可以发现map的返回值必须是一个数值，而mergeMap返回值是要求是一个Observable，也就是说，我们可以返回任意转换或具备其他能力的Observable。
  mMergeMap() {
    const source = interval(1000).pipe( take(5) );
    const result = source.pipe( mergeMap(data => data % 2 ? of(data) : EMPTY) );
    this.obsSub(result, 'mergeMap');
  }

  // 将源值投射为一个合并到输出 Observable 的 Observable,以串行的方式等待前一个完成再合并下一个 Observable
  mConcatMap() {
    const source = interval(3000);
    const result =  source.pipe(
      concatMap(data => interval(1000).pipe( take(2) ))
    );
    this.obsSub(result, 'concatMap');
  }

  // 主要作用首先会对多个Observable进行合并，并且具备打断能力，也就是说合并的这个几个Observable，某个Observable最先开始发送数据，这个时候订阅者能正常的接收到它的数据，但是这个时候另一个Observable也开始发送数据了，那么第一个Observable发送数据就被打断了，只会发送后来者发送的数据。
  mSwitchMap() {
    const source = new Observable(observable => {
      setTimeout(() => {
        observable.next('A');
      }, 1000);
    });
    const result = source.pipe(
      switchMap(data => {
        return new Observable(observable => {
          setTimeout(() => {
            observable.next(`${data}-B`);
          }, 1000);
        });
      })
    );
    console.log(`<< switchMap >>>>>>>>>>`);
    result.subscribe(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err),
    );
    // this.obsSub(result, 'switchMap');
  }

  // 用于选择出每个数据对象上的指定属性值。
  mPluck() {
    const source = of({name: '张三'}, {name: '李四'});
    const result = source.pipe( pluck('name') );
    this.obsSub(result, 'pluck');
  }

  // 累加器操作符，可以用来做状态管理
  mScan() {
    const source = of('刘一', '陈二', '张三', '李四', '王五', '赵六', '孙七', '周八', '吴九', '郑十');
    const result = source.pipe( scan((acc, cur) => `${acc} --> ${cur}`, 'start') );
    this.obsSub(result, 'scan');
  }
  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


  // 过滤操作符 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // 延时，并且 发出 最后一次发出的值; (类似于 防抖)
  mDebounceTime() {
    const source = interval(1000).pipe( take(8) );
    const result = source.pipe( debounceTime(2000) );
    this.obsSub(result, 'debounceTime');
  }

  // 接受到值之后，一定时间内 不再接受其他值; (类似于 节流)
  mThrottleTime() {
    const source = interval(1000).pipe( take(6) );
    const result = source.pipe( throttleTime(2000) );
    this.obsSub(result, 'throttleTime');
  }

  // 过滤掉重复的数据
  mDistinct() {
    const source = from([1, 2, 3, 2, 4, 3]);
    const result = source.pipe( distinct() );
    this.obsSub(result, 'distinct');
  }

  // 与数组的 filter 相同
  mFilter() {
    const source = from([1, 2, 3, 2, 4, 3]);
    const result = source.pipe( filter(item => item !== 3) );
    this.obsSub(result, 'filter');
  }

  // 只发出源 Observable 所发出的第一个值(或第一个满足条件的值)
  mFirst() {
    const source = from([1, 2, 3, 2, 4, 3]);
    const result = source.pipe( first() );
    // const result = source.pipe( first(item => item > 2) );
    this.obsSub(result, 'first');
  }

  // 控制 发出值的 数量
  mTake() {
    const source = interval(1000).pipe( take(4) );
    this.obsSub(source, 'take');
  }

  // 跳过前 N 个值
  mSkip() {
    const source = from([1, 2, 3, 4, 5, 6]).pipe( skip(2) );
    this.obsSub(source, 'skip');
  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<


  // 组合操作符 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // 将多个 Observable 合并为一个，串行；订阅者在获取值的时候 先获取完第一个，之后才开始收到后一个 Observable 的值
  mConcatAll() {
    const source = of(1, 2);
    const source2 = interval(1000).pipe( take(3) );
    const result = source.pipe(
      map(data => source2 ),
      concatAll(),
    );
    this.obsSub(result, 'concatAll');
  }

  // 将多个 Observable 合并，并行，发送数据不分先后
  mMergeAll() {
    const source = interval(1000).pipe( take(3) );
    const source2 = interval(1000).pipe( map(item => `B${item}`), take(3) );
    const result = source.pipe(
      map(data => source2),
      mergeAll(),
    );
    this.obsSub(result, 'mergeAll');
  }

  // 当任意 observable 发出值时，发出每个 observable 的最新值。
  mCombineLatest() {
    const s1 = interval(2000).pipe( take(3) );
    const s2 = interval(1000).pipe( take(5) );
    const result = combineLatest([s1, s2]).pipe( map( ([a, b]) => `${a} + ${b}`) );
    this.obsSub(result, 'combineLatest');
  }

  // 将多个 Observable 组合以创建一个 Observable，该 Observable 的值是由所有输入 Observables 的值按顺序计算而来的
  mZip() {
    const s1 = interval(2000).pipe( take(3) );
    const s2 = interval(1000).pipe( take(5) );
    const result = zip(s1, s2).pipe( map( ([a, b]) => `${a} + ${b}` ));
    this.obsSub(result, 'zip');
  }

  // 返回的 Observable 会先发出作为参数指定的项，然后再发出由源 Observable 所发出的项
  mStartWith() {
    const source = interval(1000).pipe( take(3) );
    const result = source.pipe( startWith(666) );
    this.obsSub(result, 'startWith');
  }

  // 通过只订阅最新发出的内部 Observable ，将高阶 Observable 转换成一阶 Observable
  mSwitch() {
    const btn = document.getElementById('switch');
    const source = fromEvent(btn, 'click');
    const result = source.pipe( switchMap(x => interval(1000).pipe( take(3) ) ) );
    this.obsSub(result, 'switchMap');
  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // 冷/热 Observable >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // cold Observable
  // 推送值的生产者 producer 来自 observable 内部。将会推送什么样的值在 observable 创建时被定义下来，不会改变
  // producer 与 observer 是一对一的关系，即是 unicast (单播)的。
  // 当有 observer 订阅时，producer 会把预先定义好的若干值依次推送给每个 observer
  mColdObservable() {
    const source = new Observable(subscriber => {
      console.log('stream 开始');
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.next(4);
      console.log('steam 结束');
      subscriber.complete();
    });

    source.subscribe(data => console.log(`Observable 第一次订阅: ${data}`));
    // 1, 2, 3, 4
    source.subscribe(data => console.log(`Observable 第二次订阅: ${data}`));
    // 1, 2, 3, 4
  }

  // hot Observable
  // 推送值的producer来自observable外部，何时推送以及推送什么样的值在创建时都是未知的。producer与observer是一对多的关系，即multicast (多播)的。
  // 每当有observer订阅时，会将observer注册到观察者列表中。
  // 当外部的producer被触发或执行时，会将值同时推送给所有的observer
  mHotObservable() {
    const source$ = new Subject();
    source$.subscribe(data => console.log(`Subject 第一次订阅: ${data}`));
    // 1, 2, 3, 4
    source$.next(1);
    source$.next(2);
    source$.subscribe(data => console.log(`Subject 第二次订阅: ${data}`));
    // 3, 4
    source$.next(3);
    source$.next(4);
    source$.subscribe(data => console.log(`Subject 第三次订阅: ${data}`));
    // (沒收到任何事件就结束了)
    source$.complete();
  }

  mWarmObservable() {
    const source$ = new Observable(observe => {
      console.log('stream 开始');
      setTimeout(() => observe.next(1), 100);
      setTimeout(() => observe.next(2), 200);
      setTimeout(() => observe.next(3), 300);
      setTimeout(() => {
        observe.next(4);
        observe.complete();
        console.log('stream 结束');
      }, 400);
    });

    const hotSource$ = source$.pipe( share() );

    setTimeout(() => {
      hotSource$.subscribe(data => console.log(`Observable 第一次订阅： ${data}`));
      setTimeout(() => {
        hotSource$.subscribe(data => console.log(`Observable 第二次订阅：${data}`));
      }, 200);
    }, 1000);
  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // 多播操作符 >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  // 多播暖模式
  mPubHot1() {
    const source = interval(1000).pipe(take(3), share());
    source.subscribe((x) => console.log(x));
    setTimeout(() => {
      source.subscribe((x) => console.log('setTimeout2', x));
    }, 2000);
    setTimeout(() => {
      source.subscribe((x) => console.log('setTimeout3', x));
    }, 3000);
  }

  mPubHot2() {
    const source = new ReplaySubject();
    source.subscribe((x) => console.log(x));
    source.next(1);
    source.next(2);
    // setTimeout(() => { source.next(3); }, 2000);
    // setTimeout(() => { source.next(4); }, 3000);
    setTimeout(() => { source.next(5); }, 4000);
    setTimeout(() => {
      source.next(3);
      source.subscribe((x) => console.log('setTimeout2', x));
    }, 2000);
    setTimeout(() => {
      source.next(4);
      source.subscribe((x) => console.log('setTimeout3', x));
    }, 3000);
  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // Subject >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

  mSubjectAndObservable() {
    const source = new Subject();
    // 先订阅
    source.subscribe((data) => console.log(`Subject 第一次订阅: ${data}`));
    // 触发next方法，推送数据流
    source.next(1);
    source.next(2);
    source.subscribe((data) => console.log(`Subject 第二次订阅: ${data}`));
    // 这里第一次订阅也会收到消息，multicast
    source.next(3);
    source.next(4);
    source.subscribe((data) => console.log(`Subject 第三次订阅: ${data}`));
    source.complete();
    const source2 = new Observable((subscriber) => {
      console.log('stream 开始');
      // 建立对象时，决定好数据流向，等待外部订阅
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);
      subscriber.next(4);
      console.log('steam 结束');
      subscriber.complete();
    });
    source2.subscribe((data) =>
      console.log(`Observable 第一次订阅: ${data}`)
    );
    // 每次订阅都独立的，一对一，unicast Cold Observalbe 参考1.4
    source2.subscribe((data) =>
      console.log(`Observable 第二次订阅: ${data}`)
    );
  }

  mBehaviorSubject() {
    const source = new BehaviorSubject(0);
    source.subscribe((data) =>
      console.log(`BehaviorSubject 第一次订阅: ${data}`)
    );
    // BehaviorSubject 第一次订阅: 0
    source.next(1);
    // BehaviorSubject 第一次订阅: 1
    source.next(2);
    // BehaviorSubject 第一次订阅: 2
    source.subscribe((data) =>
      console.log(`BehaviorSubject 第二次订阅: ${data}`)
    );
    // BehaviorSubject 第二次订阅: 2
    source.next(3);
    // BehaviorSubject 第一次订阅: 3
    // BehaviorSubject 第二次订阅: 3
    source.next(4);
    // BehaviorSubject 第一次订阅: 4
    // BehaviorSubject 第二次订阅: 4
    console.log(`目前 BehaviorSubject 的内容为: ${source.value}`);
    // 目前 BehaviorSubject 的内容为: 4
  }

  // <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<

  // --------------------------------------------------------------------

  // observable.subscribe
  obsSub(obs, msg = '') {
    console.log(`<< ${msg} >>>>>>>>>>`);
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
}

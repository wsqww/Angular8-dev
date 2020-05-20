import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from '@core/service/behavior-subject/behavior-subject.service';

@Component({
  selector: 'app-behavior-subject',
  templateUrl: './behavior-subject.component.html',
  styleUrls: ['./behavior-subject.component.scss']
})
export class BehaviorSubjectComponent implements OnInit {

  constructor(
    private behavior: BehaviorSubjectService,
  ) { }

  public message = '';

  ngOnInit() {
    // 订阅数据
    this.behavior.message.subscribe(
      (message: any) => {
        // console.log(message);
        this.message = message;
      }
    );
  }

}

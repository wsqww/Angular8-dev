import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from '@pc-core/service/behavior-subject/behavior-subject.service';

@Component({
  selector: 'app-behavior-subject-send',
  templateUrl: './send.component.html',
  styleUrls: ['./send.component.scss']
})
export class SendComponent implements OnInit {

  constructor(
    private behavior: BehaviorSubjectService,
  ) { }

  public message = '';

  ngOnInit() {
  }

  sendMessage() {
    // console.log(this.message);
    this.behavior.changeMessage(this.message);
  }

}

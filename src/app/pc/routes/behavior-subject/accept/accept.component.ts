import { Component, OnInit } from '@angular/core';
import { BehaviorSubjectService } from '@pc-core/service/behavior-subject/behavior-subject.service';

@Component({
  selector: 'app-behavior-subject-accept',
  template: `<div class="accept">{{message}}</div>`,
  styles: [`.accept { padding: 20px; border: 1px solid #ddd; border-radius: 4px; }`]
})
export class AcceptComponent implements OnInit {

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

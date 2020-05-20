import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BehaviorSubjectService {

  constructor() { }

  public message = new BehaviorSubject<string>('初始值');

  // 修改 变量
  changeMessage(str: string): void {
    this.message.next(str);
  }

}

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { RoutesRoutingModule } from './routes-routing.module';
import { LayoutModule } from '@layout/layout.module';
import { SharedModule } from '@shared/shared.module';


import { TestComponent } from './test/test.component';
import { AudioComponent } from './test/audio/audio.component';
import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component';
import { SendComponent } from './behavior-subject/send/send.component';
import { AcceptComponent } from './behavior-subject/accept/accept.component';
import { UploadComponent } from './upload/upload.component';
import { AnimationComponent } from './animation/animation.component';
import { NgZoneDemoComponent } from './ng-zone-demo/ng-zone-demo.component';
import { PaginationTestComponent } from './pagination-test/pagination-test.component';
import { DragComponent } from './drag/drag.component';
import { RxjsComponent } from './rxjs/rxjs.component';


@NgModule({
  declarations: [
    TestComponent,
    AudioComponent,
    BehaviorSubjectComponent,
    SendComponent,
    AcceptComponent,
    UploadComponent,
    AnimationComponent,
    NgZoneDemoComponent,
    PaginationTestComponent,
    DragComponent,
    RxjsComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    RoutesRoutingModule,
    LayoutModule,
    SharedModule,
  ]
})
export class RoutesModule { }

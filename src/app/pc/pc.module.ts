import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { BrowserModule } from '@angular/platform-browser';
// import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

// 请求拦截器
// import { HTTP_INTERCEPTORS } from '@angular/common/http';
// import { DefaultInterceptor } from '@pc-core';
// const INTERCEPTOR_PROVIDES = [
//   { provide: HTTP_INTERCEPTORS, useClass: DefaultInterceptor, multi: true },
// ];

import { CoreModule } from '@pc-core/core.module';
import { LayoutModule } from '@pc-layout/layout.module';
import { SharedModule } from '@pc-shared/shared.module';
import { PcRoutingModule } from './pc-routing.module';

import { PcComponent } from './pc.component';

import { TestComponent } from '@pc-routes/test/test.component';
import { AudioComponent } from '@pc-routes/test/audio/audio.component';
import { BehaviorSubjectComponent } from '@pc-routes/behavior-subject/behavior-subject.component';
import { SendComponent } from '@pc-routes/behavior-subject/send/send.component';
import { AcceptComponent } from '@pc-routes/behavior-subject/accept/accept.component';
import { UploadComponent } from '@pc-routes/upload/upload.component';
import { AnimationComponent } from '@pc-routes/animation/animation.component';
import { NgZoneDemoComponent } from '@pc-routes/ng-zone-demo/ng-zone-demo.component';
import { PaginationTestComponent } from '@pc-routes/pagination-test/pagination-test.component';
import { DragComponent } from '@pc-routes/drag/drag.component';
import { RxjsComponent } from '@pc-routes/rxjs/rxjs.component';
import { MonacoComponent } from '@pc-routes/monaco/monaco.component';
import { MathquillComponent } from './routes/mathquill/mathquill.component';


@NgModule({
  declarations: [
    PcComponent,

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
    MonacoComponent,
    MathquillComponent,
  ],
  imports: [
    CommonModule,
    // BrowserModule,
    // BrowserAnimationsModule,
    RouterModule,

    CoreModule,
    LayoutModule,
    SharedModule,
    PcRoutingModule,
  ],
  // providers: [INTERCEPTOR_PROVIDES],
})
export class PcModule { }

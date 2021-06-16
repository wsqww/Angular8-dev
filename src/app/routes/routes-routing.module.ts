import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from './test/test.component';
import { AudioComponent } from './test/audio/audio.component';

import { BehaviorSubjectComponent } from './behavior-subject/behavior-subject.component';
import { UploadComponent } from './upload/upload.component';
import { AnimationComponent } from './animation/animation.component';
import { NgZoneDemoComponent } from './ng-zone-demo/ng-zone-demo.component';
import { PaginationTestComponent } from './pagination-test/pagination-test.component';
import { DragComponent } from './drag/drag.component';
import { RxjsComponent } from './rxjs/rxjs.component';

const routes: Routes = [
  {
    path: 'test', component: TestComponent,
    children: [
      { path: 'audio', component: AudioComponent, data: {title: 'audio'} }
    ]
  },
  {
    path: 'behaviorsubject', component: BehaviorSubjectComponent, data: {title: 'rxjs '}
  },
  {
    path: 'upload', component: UploadComponent, data: {title: 'upload image'}
  },
  {
    path: 'animation', component: AnimationComponent, data: { title: 'animation', animation: 'animation' }
  },
  {
    path: 'ng_zone_demo', component: NgZoneDemoComponent, data: {title: 'ng zone demo'}
  },
  {
    path: 'pagination_test', component: PaginationTestComponent, data: {title: 'pagination test'}
  },
  {
    path: 'drag', component: DragComponent, data: {title: 'drag'}
  },
  {
    path: 'rxjs', component: RxjsComponent, data: {title: 'rxjs'}
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }

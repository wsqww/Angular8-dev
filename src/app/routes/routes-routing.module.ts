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

const routes: Routes = [
  {
    path: 'test', component: TestComponent, data: { animation: 'Test' },
    children: [
      { path: 'audio', component: AudioComponent, data: { animation: 'Audio' } }
    ]
  },
  {
    path: 'behaviorsubject', component: BehaviorSubjectComponent, data: { animation: 'Behaviorsubject' }
  },
  {
    path: 'upload', component: UploadComponent, data: { animation: 'Upload' }
  },
  {
    path: 'animation', component: AnimationComponent, data: { animation: 'Animation' }
  },
  {
    path: 'ng_zone_demo', component: NgZoneDemoComponent, data: { animation: 'NgZoneDemo' }
  },
  {
    path: 'pagination_test', component: PaginationTestComponent
  },
  {
    path: 'drag', component: DragComponent
  },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class RoutesRoutingModule { }

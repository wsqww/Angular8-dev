import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestComponent } from '@pc-routes/test/test.component';
import { AudioComponent } from '@pc-routes/test/audio/audio.component';
import { BehaviorSubjectComponent } from '@pc-routes/behavior-subject/behavior-subject.component';

import { PcComponent } from './pc.component';

import { UploadComponent } from '@pc-routes/upload/upload.component';
import { AnimationComponent } from '@pc-routes/animation/animation.component';
import { NgZoneDemoComponent } from '@pc-routes/ng-zone-demo/ng-zone-demo.component';
import { PaginationTestComponent } from '@pc-routes/pagination-test/pagination-test.component';
import { DragComponent } from '@pc-routes/drag/drag.component';
import { RxjsComponent } from '@pc-routes/rxjs/rxjs.component';
import { MonacoComponent } from '@pc-routes/monaco/monaco.component';

const routes: Routes = [{
  path: '', component: PcComponent,
  children: [
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
    {
      path: 'monaco', component: MonacoComponent, data: {title: 'monaco'}
    },
    { path: '**', redirectTo: 'test/audio', pathMatch: 'full' },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PcRoutingModule { }

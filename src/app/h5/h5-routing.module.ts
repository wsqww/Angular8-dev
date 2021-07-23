import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { H5Component } from './h5.component';
import { SelectImageComponent } from './routes/select-image/select-image.component';


const routes: Routes = [{
    path: '', component: H5Component,
    children: [
      { path: 'select_image', component: SelectImageComponent },
      { path: '**', redirectTo: 'select_image' }
    ],
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class H5RoutingModule { }

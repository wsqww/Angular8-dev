import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { H5RoutingModule } from './h5-routing.module';

import { H5Component } from './h5.component';
import { SelectImageComponent } from '@h5-routes/select-image/select-image.component';


@NgModule({
  declarations: [
    H5Component,
    SelectImageComponent
  ],
  imports: [
    CommonModule,
    H5RoutingModule,
  ]
})
export class H5Module { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AudioPlayerComponent } from './utils/audio-player/audio-player.component';
import { PaginationComponent } from './utils/pagination/pagination.component';



@NgModule({
  declarations: [
    AudioPlayerComponent,
    PaginationComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule,
    AudioPlayerComponent,
    PaginationComponent
  ]
})
export class SharedModule { }

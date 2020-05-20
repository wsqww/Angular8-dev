import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AudioPlayerComponent } from './utils/audio-player/audio-player.component';



@NgModule({
  declarations: [
    AudioPlayerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormsModule,
    AudioPlayerComponent
  ]
})
export class SharedModule { }

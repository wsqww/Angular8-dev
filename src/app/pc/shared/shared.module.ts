import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AudioPlayerComponent } from './utils/audio-player/audio-player.component';
import { PaginationComponent } from './utils/pagination/pagination.component';
import { SafeHTMLPipe } from './pipe/safe-html.pipe';
import { SafeUrlPipe } from './pipe/safe-url.pipe';



@NgModule({
  declarations: [
    AudioPlayerComponent,
    PaginationComponent,
    SafeHTMLPipe,
    SafeUrlPipe,
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
    PaginationComponent,
    SafeHTMLPipe,
    SafeUrlPipe,
  ]
})
export class SharedModule { }

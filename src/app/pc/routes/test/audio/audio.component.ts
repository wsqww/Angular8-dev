import { Component, OnInit } from '@angular/core';

import { AudioPlayerService } from '@pc-shared/utils/audio-player/audio-player.service';

@Component({
  selector: 'app-audio',
  templateUrl: './audio.component.html',
  styleUrls: ['./audio.component.scss']
})
export class AudioComponent implements OnInit {

  constructor(
    private audioService: AudioPlayerService,
  ) { }

  ngOnInit() {
  }

  play1() {
    // '../../../../assets/audio/朴树-空帆船.mp3'
    this.audioService.setAudio({
      src: '../../../../assets/audio/朴树-空帆船.mp3',
      name: '朴树-空帆船'
    });
    // this.audioService.play();
  }

  play2() {
    // '../../../../assets/audio/朴树-空帆船.mp3'
    this.audioService.setAudio({
      src: '../../../../assets/audio/痛仰乐队-公路之歌.mp3',
      name: '公路之歌'
    });
    // this.audioService.play();
  }

  pause() {
    this.audioService.pause();
  }

}

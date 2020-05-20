import { Injectable, Output, EventEmitter  } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioPlayerService {

  constructor() { }

  @Output() audioSrc: EventEmitter<any> = new EventEmitter();
  @Output() audioPlay: EventEmitter<any> = new EventEmitter();
  @Output() audioPause: EventEmitter<any> = new EventEmitter();

  /**
   * 设置参数
   * @param config // {src: 音频地址; name: 显示名称}}
   */
  setAudio(config: {src: string; name: string}) {
    this.audioSrc.emit(config);
    setTimeout(() => { this.play(); }, 300);
  }

  private play() {
    this.audioPlay.emit({playing: true});
  }

  pause() {
    this.audioPause.emit({playing: false});
  }

  getAudioSrc() {
    return this.audioSrc;
  }

  getAudioPlay() {
    return this.audioPlay;
  }

  getAudioPause() {
    return this.audioPause;
  }
}

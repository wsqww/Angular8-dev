import { Component, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';
import { AudioPlayerService } from './audio-player.service';

@Component({
  selector: 'app-audio-player',
  templateUrl: './audio-player.component.html',
  styleUrls: ['./audio-player.component.scss']
})
export class AudioPlayerComponent implements OnInit, OnDestroy {

  constructor(
    private audioService: AudioPlayerService,
  ) { }

  @ViewChild('audio', { static: true }) audio: ElementRef;
  @ViewChild('progressDot', { static: true }) progressDot: ElementRef;
  @ViewChild('progressBg', { static: true }) progressBg: ElementRef;

  public audioReady = false;

  public src = '';
  public name = '等待播放';
  public audioDuration = '00:00';
  public audioCurrentTime = '00:00';
  public audioVolume = 0;
  public progressRate = '0%';

  public playing = false;

  public dotPosition = {
    oriOffestLeft: 0, // 移动开始时进度条的点距离进度条的偏移值
    oriX: 0, // 移动开始时的x坐标
    maxLeft: 0, // 向左最大可拖动距离
    maxRight: 0 // 向右最大可拖动距离
  };
  public dotDragFlag = false; // 标记是否拖动开始

  ngOnInit() {
    // this.audioSet('../../../../assets/audio/朴树-空帆船.mp3');
    this.audioService.getAudioSrc().subscribe(
      (res: any) => {
        this.audioSet(res.src);
        this.name = res.name;
      }
    );
    this.audioService.getAudioPlay().subscribe(
      (res: any) => {
        this.play();
      }
    );
    this.audioService.getAudioPause().subscribe(
      (res: any) => {
        this.pause();
      }
    );
  }

  ngOnDestroy() {
    this.clearEventListener();
  }

  audioSet(src: string) {
    this.src = src;
    const audio = this.audio.nativeElement;

    // 元数据已加载
    audio.addEventListener('loadedmetadata', () => { this.audioLoadedmetadata(); });
    // 进度更新
    audio.addEventListener('timeupdate', () => { this.setCurentTime(); });
    // 播放结束
    audio.addEventListener('ended', () => { this.ended(); });

    // 拖动结束
    document.addEventListener('mouseup', () => { this.mouseUp(); } );

    this.audioReady = true;
  }

  audioLoadedmetadata() {
    this.setDuration();
    this.audioVolume = Math.round(this.audio.nativeElement.volume * 100);
  }

  // 音频时长
  setDuration() {
    this.audioDuration = this.ransTime(this.audio.nativeElement.duration);
  }

  // 播放时长
  setCurentTime() {
    const audio = this.audio.nativeElement;
    this.audioCurrentTime = this.ransTime(audio.currentTime);
    this.progressRate = Math.round((Math.floor(audio.currentTime) / Math.floor(audio.duration)) * 100) + '%';
  }

  // 播放
  play() {
    if (!this.audioReady) { return false; }
    this.audio.nativeElement.play();
    this.playing = true;
  }

  // 重播
  rePlay() {
    // this.audioSet('../../../../assets/audio/朴树-空帆船.mp3');
    this.audio.nativeElement.currentTime = 0;
    this.play();
  }

  // 暂停
  pause() {
    this.audio.nativeElement.pause();
    this.playing = false;
  }

  // 播放结束
  ended() {
    this.audio.nativeElement.currentTime = 0;
    this.pause();
    this.playing = false;
  }

  // 时间转换
  ransTime(time) {
    const duration = parseInt(time, 10);
    let minute = String(parseInt(String(duration / 60), 10));
    let sec = String(duration % 60);
    const isM0 = ':';
    if (minute === '0') {
      minute = '00';
    } else if (Number(minute) < 10) {
      minute = '0' + minute;
    }
    if (sec.length === 1) {
      sec = '0' + sec;
    }
    return minute + isM0 + sec;
  }

  // 清除事件监听
  clearEventListener() {
    const audio = this.audio.nativeElement;
    audio.removeEventListener('loadedmetadata', () => { this.audioLoadedmetadata(); });
    audio.removeEventListener('timeupdate', () => { this.setCurentTime(); });
    audio.removeEventListener('ended', () => { this.ended(); });

    // this.progressDot.nativeElement.removeEventListener('mousedown', () => { this.mouseDown(); });
    // this.progressBg.nativeElement.removeEventListener('mousemove', () => { this.mouseMove(); });
    document.removeEventListener('mouseup', () => { this.mouseUp(); });
  }

  // 鼠标 事件
  mouseDown(event) {
    const audio = this.audio.nativeElement;
    if ( !this.playing || audio.currentTime === 0) {
      // 只有音乐开始播放后才可以调节，已经播放过但暂停了的也可以
      return false;
    }
    this.dotDragFlag = true;

    this.dotPosition.oriOffestLeft = this.progressDot.nativeElement.offsetLeft;
    this.dotPosition.oriX = event.touches ? event.touches[0].clientX : event.clientX; // 要同时适配mousedown和touchstart事件
    this.dotPosition.maxLeft = this.dotPosition.oriOffestLeft; // 向左最大可拖动距离
    this.dotPosition.maxRight = this.progressBg.nativeElement.offsetWidth - this.dotPosition.oriOffestLeft; // 向右最大可拖动距离

    // 禁止默认事件（避免鼠标拖拽进度点的时候选中文字）
    if (event && event.preventDefault) {
      event.preventDefault();
    } else {
      event.returnValue = false;
    }

    // 禁止事件冒泡
    if (event && event.stopPropagation) {
      event.stopPropagation();
    } else {
      // tslint:disable-next-line: deprecation
      window.event.cancelBubble = true;
    }

    // console.log(this.dotPosition);
  }

  mouseMove(event) {
    // console.log(this.dotDragFlag);
    if (!this.dotDragFlag) {
      return false;
    }

    const audio = this.audio.nativeElement;
    const clientX = event.touches ? event.touches[0].clientX : event.clientX; // 要同时适配mousemove和touchmove事件
    let length = clientX - this.dotPosition.oriX + (this.progressDot.nativeElement.offsetWidth);
    // console.log('clientX', clientX);
    // console.log('length', length);
    if (length > this.dotPosition.maxRight) {
      length = this.dotPosition.maxRight;
    } else if (length < -this.dotPosition.maxLeft) {
      length = - this.dotPosition.maxLeft;
    }
    // console.log('length', length);
    const pgsWidth = this.progressBg.nativeElement.offsetWidth;
    const rate = (this.dotPosition.oriOffestLeft + length) / pgsWidth;
    // console.log('pgsWidth', pgsWidth);
    // console.log('rate', rate);
    audio.currentTime = audio.duration * rate;
  }

  mouseUp() {
    this.dotDragFlag = false;
  }

  changeVolume(type: '+' | '-') {
    let volume = this.audio.nativeElement.volume * 100;

    if (type === '+') { volume += 10; }
    if (type === '-') { volume -= 10; }

    volume = volume >= 100 ? 100 : volume;
    volume = volume <= 0 ? 0 : volume;

    this.audioVolume = volume;
    this.audio.nativeElement.volume = volume / 100;
  }
}

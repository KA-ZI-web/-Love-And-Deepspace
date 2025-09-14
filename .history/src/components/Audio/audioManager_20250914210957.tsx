class AudioManager {
  private audio: HTMLAudioElement | null = null;
  private isMuted = false;

  // 初始化音频
  init(src: string) {
    this.audio = new Audio(src);
    this.audio.loop = true;
    this.audio.volume = 0.5;
    
    // 尝试自动播放
    this.play().catch((error) => {
      if(error.name === "NotAllowedError"){
      console.log('自动播放被拦截，需要用户交互触发');
    }
    throw error;
  });
  }

  // 播放音频
  async play() {
    if (!this.audio) {
      console.error ("AUDIO_INIT_ERROR: 音频未初始化")
      return;
    }
    try{
      await this.audio.play();
      console.log('AUDIO_PLAY_SUCCESS: 音频播放成功');
    }catch(error:any){
      if (error.name === "NotAllowedError"){
        console.log("AUDIO_AUTOPLAY_BLOCKED: 自动播放被拦截，需用户交互")
      }else{
        console.error(`AUDIO_PLAY_FAILED: ${error.message}`);
      }
      return;
    }
  }

  // 暂停音频
  pause() {
    if (this.audio) {
      this.audio.pause();
    }
  }

  // 静音
  mute() {
    if (this.audio) {
      this.audio.muted = true;
      this.isMuted = true;
    }
  }

  // 取消静音
  unmute() {
    if (this.audio) {
      this.audio.muted = false;
      this.isMuted = false;
    }
  }

  // 切换静音状态
  toggleMute() {
    if (this.isMuted) {
      this.unmute();
    } else {
      this.mute();
    }
  }
}

export const audioManager = new AudioManager();
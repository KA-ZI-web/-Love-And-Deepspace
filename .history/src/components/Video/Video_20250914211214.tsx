import { useRef, useState, useEffect } from 'react';
import '../../common/style/video-modal.css';
import { audioManager } from '../Audio/audioManager'; // 导入音频管理器

interface VideoModalProps{
    videoSrc : string;
    isOpen : boolean;
    onClose : () => void;
}

const VideoModal= ({ videoSrc, isOpen, onClose }:VideoModalProps) => {
  const videoRef = useRef(null as HTMLVideoElement | null);
  const [isMuted, setIsMuted] = useState(false);

  // 弹窗打开时静音背景音乐，关闭时恢复
  useEffect(() => {
    if (isOpen) {
      audioManager.mute();
    } else {
      audioManager.unmute();
    }
  }, [isOpen]);

  //监听+同步自动播放和状态
  useEffect (() => {
    const video = videoRef.current;
    if (!video) return;
    const handleVolumeChange = () => setIsMuted(video.muted);
    video.addEventListener('volumechange', handleVolumeChange);
   
    return() => {
      video.removeEventListener('volumechange', handleVolumeChange);
    }
  },[videoSrc]);
  // 处理自动播放逻辑
    useEffect(() => {
        if (!isOpen) return;
        
        const video = videoRef.current;

        if (!video) return;

        // 当模态框打开时尝试播放
        const attemptPlay = async () => {
            try {
                await video.play();
                setIsMuted(false);
            } catch (err) {
                console.warn('自动播放受限制，需要用户交互后才能播放:', err);
              }
        };
        attemptPlay();
    }, [isOpen, videoSrc]); // 依赖isOpen确保模态框打开时才尝试


     //处理视频焦点和自动播放
    useEffect(()=>{
        if(isOpen && videoRef.current){
            videoRef.current.focus();
        }
    },[isOpen]);


    if (!isOpen) return null;

  return (
    <div className="video-modal-overlay" onClick={onClose}>
      <div className="video-modal-content" 
      onClick={(e) => e.stopPropagation()}
      style={{ position: 'relative', maxWidth: '800px' }}
      >
        <button 
        onClick={() => {
          console.log('关闭按钮被点击');
          onClose();
        }}
        
        className='close-button'>X</button>
        <video 
            ref={videoRef}
            src={videoSrc}
            muted={isMuted}
            controls
            loop
            playsInline 
            className='video-element'
        />

        </div>
    </div>
  );
};

export default VideoModal;




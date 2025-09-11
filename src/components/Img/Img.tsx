import { useRef, useEffect } from 'react';
import '../../common/style/video-modal.css';

interface ImgProps{
    imgSrc : string;
    isOpen : boolean;
    onClose : () => void;
}

const Img= ({ imgSrc, isOpen, onClose }:ImgProps) => {
  const imgRef = useRef(null as HTMLVideoElement | null);
 

     //处理弹窗焦点和自动播放
    useEffect(()=>{
        if(isOpen && imgRef.current){
            imgRef.current.focus();
        }
    },[isOpen]);


    if (!isOpen) return null;

  return (
    <div className="img-overlay" onClick={onClose}>
      <div className="img-content" 
      onClick={(e) => e.stopPropagation()}
      style={{ position: 'relative', maxWidth: '800px' }}
      >
        <button 
        onClick={() => {
          console.log('关闭按钮被点击');
          onClose();
        }}
        
        className='close-button'>X</button>
        <img 
            ref={imgRef}
            src={imgSrc}
            className='img-element'
        />

        </div>
    </div>
  );
};

export default Img;
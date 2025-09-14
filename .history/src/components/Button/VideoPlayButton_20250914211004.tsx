import '../../common/style/video-modal.css';

interface VideoPlayButtonProps {
  onClick: () => void;
  size?: number;
  color?: string;
  activeColor?: string;
  strokeWidth?: number;
}

const VideoPlayButton =({
  onClick,
  color = "currentColor",
  strokeWidth = 1.6
}: VideoPlayButtonProps) => {

  return (
    <div className='VideoButton'
    onClick={onClick}
    aria-label="Play video">    
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="100%"
          height="100%"
        >
          {/* 静态背景圆 */}
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeOpacity="0.3"
          />
          
          {/* 脉动动画圆 */}
          <circle
            cx="12"
            cy="12"
            r="9"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeOpacity="0.6"
          >
              <animate
              attributeName="r"
              from="9"
              to="12"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.6"
              to="0"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          
          {/* 播放三角形 */}
          <path
            fill={color}
            d="M8 6L18 12L8 18z"
          />
        </svg>
      
    </div>
  );
};

export default VideoPlayButton;

import { useState } from 'react';
import Side from '../../components/Side/Side';
import VideoModal from '../../components/Video/Video';
import VideoPlayButton from '../../components/Button/VideoPlayButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css'; // 核心样式
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HeroBanner.css'; //添加单独的样式文件

//资源引入
import name from '../../common/images/HeroBanner/sxhname.png';
import age from '../../common/images/HeroBanner/age.png';
import birthday from '../../common/images/HeroBanner/birthday.png';
import height from '../../common/images/HeroBanner/height.png';
import id from '../../common/images/HeroBanner/id.png';
import evol from '../../common/images/HeroBanner/evol.png';
import video1 from '../../common/video/star.mp4';
import video2 from '../../common/video/brother.mp4';
import video3 from '../../common/video/light.mp4';
import video4 from '../../common/video/king.mp4';

interface MediaItem{
    id : number;
    videoUrl : string;
    alt : string;
    overlays : {
        videoSrc : string;
        characterImage : string; // 角色图URL
        title : string;        // 主标题（如"祁煜"）
        subtitle : string;     // 副标题（如"你相信..."）
        details : {            // 详情项
            Image: string ;
            text: string;       // 文字内容
        }[];
    }[];
}

const HeroBanner = ()=> {
    
    const mediaItems:MediaItem[]= [
        //视频
        {
            id: 1 ,
            videoUrl: video1, 
            alt: '沈星回', 
            overlays:[
                {
                    videoSrc: video1,
                    characterImage: name,
                    title: "搭档",
                    subtitle: "双星之剑，永远指向同一个方向。",
                    details: [
                    { Image:age,text: "未知"} ,
                    { Image:birthday,text: "10月16日"} ,
                    { Image:height,text: "185CM" },
                    { Image:id,text: "深空猎人" },
                    { Image:evol,text: "光"} 
                    ],
                }
            ]
        },
        {
            id: 2 ,
            videoUrl: video2, 
            alt: '菲罗斯王子',  
            overlays:[
                {
                    videoSrc: video2,
                    characterImage: name,
                    title: "师兄",
                    subtitle: "还是让星星自己落下来，留在你身边吧。",
                    details: [
                    { Image:age,text: "未知"} ,
                    { Image:birthday,text: "10月16日"} ,
                    { Image:height,text: "185CM" },
                    { Image:id,text: "菲洛斯星王子" },
                    { Image:evol,text: "光"} 
                    ],
                }
            ] 
        },
        {
            id: 3 , 
            videoUrl: video3, 
            alt: '光猎', 
            overlays:[
                {
                    videoSrc: video3,
                    characterImage: name,
                    title: "光猎",
                    subtitle: "我和光猎，你更喜欢哪一个？",
                    details: [
                    { Image:age,text: "未知"} ,
                    { Image:birthday,text: "10月16日"} ,
                    { Image:height,text: "185CM" },
                    { Image:id,text: "光猎" },
                    { Image:evol,text: "光"} 
                    ],
                }
            ] 
        },
        {
            id: 4 , 
            videoUrl: video4, 
            alt: '暗誓国王', 
            overlays:[
                {
                    videoSrc: video4,
                    characterImage: name,
                    title: "国王",
                    subtitle: "命运既定，我自裁决。",
                    details: [
                    { Image:age,text: "未知"} ,
                    { Image:birthday,text: "10月16日"} ,
                    { Image:height,text: "185CM" },
                    { Image:id,text: "暗誓国王" },
                    { Image:evol,text: "光"} 
                    ],
                }
            ]
         },  
    ];

const [currentVideo, setCurrentVideo] = useState(null);

    return(
        <div className='hero-banner'>
            <Side />
            <div className='swiper-container'>
                <Swiper
                modules={[Navigation, Pagination]}
                navigation={{
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',    
                }} // 显示左右箭头按钮
                pagination={{ clickable: true }} // 可点击的分页器
                loop={true} // 循环播放
                speed={0}
                autoplay={{ delay: 3000 }} // 自动播放（可选）
                slidesPerView={1} // 关键：每次只显示一个幻灯片
                direction="horizontal" // 明确横向滑动（默认值，可省略）
                style={{ height: "100%" }} // 手动确保高度
                >
                    {mediaItems.map((item) => (
                        <SwiperSlide key={item.id} className={`slide-${item.id}`}>
                            <div className='video-slide'>
                                {/*视频背景*/}
                                <video 
                                    className='video-background'
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    >
                                    <source src={item.videoUrl}/>
                                </video>
                            
                                {/* 半透明遮罩 */}
                                <div className="line line-left" />
                                <div className="line line-right" />
                                <div className="line line-bottom" />

                                
                            
                                {/*图文*/}
                                {item.overlays.map((overlay,index) =>(
                                    <div key={index} className='overlay-content'>

                                    
                                    {/*角色名称*/}
                                        <img 
                                            src={overlay.characterImage}
                                            className="character-img"
                                            alt={overlay.title}
                                        />

                                    {/*文字*/}
                                        <div className='text-content'>
                                            <div className='videoplay'>
                                                <VideoPlayButton 
                                                    onClick={() => setCurrentVideo(overlay.videoSrc)} // 点击时设置当前视频
                                                    size={64}
                                                    color="#FFFFFF"
                                                />
                                            </div>
                                            <h2 className="title">{overlay.title}</h2>
                                            
                                            <p className="subtitle">{overlay.subtitle}</p>
                                            
                                            <div className='details'>
                                                {overlay.details.map((detail,i) => (
                                                    <div key={i} className='detail-item'>
                                                        <img src={detail.Image} className="detail-icon" alt={detail.text} />
                                                        <span>{detail.text}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                    {/*装饰元素*/}
                                        <div className='decoration'/>
                                </div>
                                ))}
                            </div>
                        </SwiperSlide>
                    ))}

                    {/* 添加导航按钮 */}
                    <div className="swiper-button-next"></div>
                    <div className="swiper-button-prev"></div>
                </Swiper>
            </div>
            {/*弹窗*/}
            <VideoModal 
                videoSrc={currentVideo || ''}
                isOpen={!!currentVideo}
                onClose={() => setCurrentVideo(null)}
            />
        </div>
    );
}

export default HeroBanner
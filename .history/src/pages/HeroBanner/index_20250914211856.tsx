import { useState } from 'react';
import Side from '../../components/Side/Side';
import VideoModal from '../../components/Video/Video';
import VideoPlayButton from '../../components/Button/VideoPlayButton';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';

import 'swiper/css'; 
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './HeroBanner.css'; 


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
        characterImage : string; 
        title : string;        
        subtitle : string;     
        details : {            
            Image: string ;
            text: string;       
        }[];
    }[];
}

const HeroBanner = ()=> {
    
    const mediaItems:MediaItem[]= [
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
                }} 
                pagination={{ clickable: true }}
                loop={true} 
                speed={0}
                autoplay={{ delay: 3000 }} 
                slidesPerView={1} 
                direction="horizontal" 
                style={{ height: "100%" }}
                >
                    {mediaItems.map((item) => (
                        <SwiperSlide key={item.id} className={`slide-${item.id}`}>
                            <div className='video-slide'>
                                <video 
                                    className='video-background'
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    >
                                    <source src={item.videoUrl}/>
                                </video>
                            
                                <div className="line line-left" />
                                <div className="line line-right" />
                                <div className="line line-bottom" />

                                {item.overlays.map((overlay,index) =>(
                                    <div key={index} className='overlay-content'>


                                        <img 
                                            src={overlay.characterImage}
                                            className="character-img"
                                            alt={overlay.title}
                                        />

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

                                        <div className='decoration'/>
                                </div>
                                ))}
                            </div>
                        </SwiperSlide>
                    ))}

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
import { useState,useRef,useEffect } from 'react';
import Side from '../../components/Side/Side';
import { Swiper, SwiperSlide } from 'swiper/react';
import {Parallax, Navigation, Pagination } from 'swiper/modules';
import VideoModal from '../../components/Video/Video';
import type { Swiper as SwiperType } from 'swiper';

import 'swiper/css'; 
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './Card.css';

import video1 from '../../common/video/pv/国王.mp4';
import video2 from '../../common/video/pv/聆花意.mp4';
import video3 from '../../common/video/pv/星泊地.mp4';
import video4 from '../../common/video/pv/夕花显影.mp4';
import video5 from '../../common/video/pv/毛绒攻势.mp4';
import video6 from '../../common/video/pv/远航.mp4';


interface CharacterItem{
    id: number;
    title : string; 
    videoSrc : string;
    details : {            
        text: string;       
    }[];
}


const Character = () => {
    //匹配项，导入相应资源
    const characterItems : CharacterItem[] = [
        {
            id:  1 ,
            title :  "沈星回.暗誓国王", 
            videoSrc : video1 ,
            details :[
                {text: "授印"},
                {text: "流明华光"},
                {text: "裁以为王"},
                {text: "加冕"},
            ],
        },
        {
            id:  2 ,
            title :  "沈星回.聆花意", 
            videoSrc : video2 ,
            details :[
                {text: "月引"},
                {text: "月闪"},
                {text: "心辉月芒"},
                {text: "月落"},
            ],
        },
        {
            id:  3 ,
            title :  "沈星回.星泊地", 
            videoSrc : video3 , 
            details :[
                {text: "蓄光风暴"},
                {text: "朔光力场"},
                {text: "银河脉冲"},
                {text: "磁星凝辉"},
            ],
        },
        {
            id:  4 ,
            title :  "沈星回.夕花显影", 
            videoSrc : video4 ,
            details :[
                {text: "纸刃"},
                {text: "流萤"},
                {text: "星愿"},
                {text: "落雨之屏"},
            ],
        },
        {
            id:  5 ,
            title :  "沈星回.毛绒攻势", 
            videoSrc : video5 ,
            details :[
                {text: "光源瞬影"},
                {text: "光源急袭"},
                {text: "光源共振"},
                {text: "光源增幅"},
            ],
        },
        {
            id:  6 ,
            title :  "沈星回.离群远航", 
            videoSrc : video6 ,
            details :[
                {text: "星隐"},
                {text: "星随"},
                {text: "星爆"},
                {text: "星破"},
            ],
        },
        
    ];
    
    const [currentVideo,setCurrentVideo]=useState(null);
    const swiperRef = useRef(null);

    //设置鼠标跟随事件
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const containerRef = useRef(null);
    const myStyle: { [key: string]: string | number } = {
        '--mouse-x': mousePosition.x,
        '--mouse-y': mousePosition.y
    };
    useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;
    let lastTime = 0;

    const handleMouseMove = (e: MouseEvent) => {
        const now = Date.now();
        if (now - lastTime < 50) return;
        lastTime = now;
        if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        // 计算相对于容器中心的位置
        setMousePosition({
            x: (x - centerX) / centerX,
            y: (y - centerY) / centerY
        });
        }
    }; 
    container.addEventListener('mousemove', handleMouseMove);
    return () => container.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
  console.log('Position updated:', mousePosition);
}, [mousePosition]);


    return (
        <div className='character-card'>
            <Side />
            <div className='feature-container'>
                {/*装饰元素*/}
                <div className='slogan-Vertical'/>
                <div className='linkong'/>
                <div className='right-Dot'/>
                <div className='right-Slogan'/>
                <div className="external-pagination"/>
                <div className="feature-content" ref={containerRef}>
                    {/*Swiper核心区域*/}
                    <div className='feature-swiper-box'>
                        <div className="swiper-button-next"/>
                        <div className="swiper-button-prev"/>
                        <Swiper
                        modules={[Parallax,Navigation, Pagination]}
                        parallax={true}
                        pagination={{ 
                            el: '.external-pagination',
                            clickable: true 
                        }} 
                        navigation={{
                        nextEl: '.swiper-button-next',
                        prevEl: '.swiper-button-prev',    
                        }} 
                        allowTouchMove={false}
                        loop={true}
                        autoplay={{ delay: 3000 }} 
                        speed={250}
                        slidesPerView={3}
                        observer={false}
                        observeParents={false}
                        centeredSlides={true}
                        slidesOffsetBefore={-50}
                        spaceBetween={100}
                        watchSlidesProgress={false}
                        onSwiper={(swiper:SwiperType) => {
                            swiperRef.current = swiper;
                        }}
                        >
                            {characterItems.map((item) => (
                                <SwiperSlide 
                                    key={item.id}
                                    style={myStyle}
                                >                          
                                    <div className='swiper-box'>
                                        <div className='swiper-box-top'>
                                            <div className='serial'>
                                                <div className='serial-title'>
                                                    <p>0{item.id}</p>
                                                </div>
                                                <div className='serial-pinto'/>
                                            </div>
                                            <div className='lineAcross'/>
                                            <div className='lineVertical'/>
                                        </div>
                                        <div className='swiper-box-content'>
                                            <div className='slide-title'>
                                                <p>{item.title}</p>
                                            </div>
                                            <ul  className='slideDetails'>
                                                {item.details.map((detail,i) => (
                                                    <li key={i}>
                                                        <i></i>
                                                        <span>{detail.text}</span>
                                                    </li>
                                                ))}      
                                            </ul>
                                            <div className='slideTips'>
                                                <span>点击右侧视频放大观看</span>
                                                <i></i>
                                            </div>
                                            <div className='deepspace'>
                                                <span>LOVE</span>
                                                <b>AND</b>
                                                <span>DEEPSPACE</span>
                                            </div>
                                            <div className='swiper-content-bg'/>
                                        </div>
                                    </div>
                                        <div className='video-frame'>
                                            <div className='video-mask'/>
                                            <video 
                                                onClick={() => setCurrentVideo(item.videoSrc)}
                                                loop
                                                muted
                                                autoPlay
                                                src= {item.videoSrc}
                                                className='video'
                                            />
                                        </div>
                                    
                                </SwiperSlide>
                            ))}
                        </Swiper>
                    </div>
                </div>
                {/*弹窗*/}
                <VideoModal 
                    videoSrc={currentVideo || ''}
                    isOpen={!!currentVideo}
                    onClose={() => setCurrentVideo(null)}
                />
                </div>
        </div>
    )
}

export default Character



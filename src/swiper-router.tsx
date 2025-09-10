
import { useEffect, useRef, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation,  Mousewheel, Keyboard } from 'swiper/modules';
import type { Swiper as SwiperType } from 'swiper';
import Header from './components/Header/Header';
import { audioManager } from './components/Audio/audioManager'; // 导入音频管理器

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

import Home from "./pages/Home"
import HeroBanner from "./pages/HeroBanner"
import Character from "./pages/CharacterCard"
import Download from "./pages/Download"

// 页面数据配置 - 与Header菜单项对应
const pageData = [
  { path: '/', title: '首页', content: <Home/>, menuClass: 'home' },
  { path: '/character', title: '角色介绍', content: <HeroBanner/>, menuClass: 'character' },
  { path: '/feature', title: '特色玩法', content: <Character/>, menuClass: 'feature' },
  { path: '/gallery', title: '视听中心', content: <Download/>, menuClass: 'views' },
];



const SwiperVerticalRouter= () => {
  const navigate = useNavigate();
  const location = useLocation();
  const swiperRef = useRef(null);
  const [isSwiperReady, setIsSwiperReady] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

 // 处理音频
const handleClickRef = useRef(() => {
    console.log("用户点击事件触发！")
    audioManager.play().catch(err => console.log("播放失败：", err));
    });

  useEffect(() => {
    console.log("事件绑定逻辑")
    
    const handleClick = handleClickRef.current;
    
    console.log("准备绑定事件，回调函数：",handleClick)
    document.addEventListener('click', handleClick);
    console.log("事件绑定事件执行完毕")

     initAudio();
     return () => {
      console.log("组件卸载，移除事件")
      document.removeEventListener('click', handleClick);
    }
  }, []);
  //使用audioManager逻辑，避免直接对Dom进行操作
  

  const initAudio=async() => {
    try{
      audioManager.init('/银瀑奏鸣.mp3');
    }catch(error:any){
      if(error.message.startsWith("AUDIO_AUTOPLAY_BLOCKED")){
        console.log("自动播放被拦截，等待用户点击...");
      }
    }
  }

  // 根据当前路径初始化索引
  useEffect(() => {
    const pathIndex = pageData.findIndex(page => page.path === location.pathname);
    if (pathIndex !== -1 && pathIndex !== currentIndex) {
      setCurrentIndex(pathIndex);
      updateHeaderActiveClass(pathIndex);
    }
  }, [location.pathname]);

  // Swiper 初始化
  const handleSwiperInit = (swiper: SwiperType) => {
    console.log('✅ Swiper 初始化完成');
    swiperRef.current = swiper;
    setIsSwiperReady(true);

    // 根据当前路径设置初始幻灯片位置
    const pathIndex = pageData.findIndex(page => page.path === location.pathname);
    if (pathIndex !== -1) {
      setTimeout(() => {
        swiper.slideTo(pathIndex, 0);
        setCurrentIndex(pathIndex);
        updateHeaderActiveClass(pathIndex);
      }, 100);
    }
  };

  // 处理路由变化
  useEffect(() => {
    if (!isSwiperReady || !swiperRef.current) return;

    const pathIndex = pageData.findIndex(page => page.path === location.pathname);
    if (pathIndex !== -1 && pathIndex !== currentIndex) {
      swiperRef.current.slideTo(pathIndex, 800);
      setCurrentIndex(pathIndex);
      updateHeaderActiveClass(pathIndex);
    }
  }, [location.pathname, isSwiperReady]);

  // 滑动时更新路由+索引
  const handleSlideChange = (swiper: SwiperType) => {
    const newIndex = swiper.activeIndex;
    if (newIndex !== currentIndex) {
      setCurrentIndex(newIndex);
      updateHeaderActiveClass(newIndex);
      
      const targetPath = pageData[newIndex]?.path;
      if (targetPath && location.pathname !== targetPath) {
        navigate(targetPath, { replace: true });
      }
    }
  };

  // 更新Header激活状态
  const updateHeaderActiveClass = (activeIndex: number) => {
    // 移除所有活动类
    const headerItems = document.querySelectorAll('.M-header-em');
    headerItems.forEach(item => item.classList.remove('active'));
    
    // 添加当前活动类
    const activeClass = pageData[activeIndex]?.menuClass;
    if (activeClass) {
      const activeItem = document.querySelector(`.M-header-em.${activeClass}`);
      if (activeItem) {
        activeItem.classList.add('active');
      }
    }
  };

  // 手动更新 Swiper 活动状态
  const updateActiveSlide = () => {
    if (!swiperRef.current) return;

    swiperRef.current.slides.forEach((slide: HTMLElement, index: number) => {
      if (index === currentIndex) {
        slide.classList.add('swiper-slide-active');
      } else {
        slide.classList.remove('swiper-slide-active');
      }
    });
  };

  // 当索引变化时更新 Swiper 状态
  useEffect(() => {
    if (isSwiperReady) {
      updateActiveSlide();
    }
  }, [currentIndex, isSwiperReady]);

  // 导航到特定幻灯片
  const goToSlide = (index: number) => {
    if (swiperRef.current) {
      swiperRef.current.slideTo(index, 800);
    }
  };

  // Header 点击处理
  const handleHeaderClick = (index: number) => {
    console.log('Header clicked, navigating to index:', index);
    goToSlide(index);
    
    // 同时更新URL
    const targetPath = pageData[index]?.path;
    if (targetPath) {
      navigate(targetPath, { replace: true });
    }
  };

  return (
    <div className="layout">
      {/* 传递点击处理函数给Header组件 */}
      <Header onMenuClick={handleHeaderClick} />
      
      <div className="content">
        <div className="swiper-container">
          {!isSwiperReady && (
            <div className="loading">Swiper 初始化中...</div>
          )}
          
          <div style={{ display: isSwiperReady ? 'block' : 'none', height: '100%' }}>
            <Swiper
              onSwiper={handleSwiperInit}
              onSlideChange={handleSlideChange}
              direction="vertical"
              loop={false}
              slidesPerView={1}
              speed={800}
              modules={[Navigation,  Mousewheel, Keyboard]}
              className="my-swiper"
              mousewheel={true}
              keyboard={{ enabled: true }}
            >
              {pageData.map((page, index) => {
                const isActive = index === currentIndex;
                return (
                  <SwiperSlide key={page.path}>
                    <div className={`slide-content ${isActive ? 'active' : ''}`}>
                      {page.content}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SwiperVerticalRouter;
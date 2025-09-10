import { useState} from 'react';
import Side from '../../components/Side/Side';
import VideoModal from '../../components/Video/Video';
import Img from '../../components/Img/Img';


import './Download.css'; 

import cover1 from '../../common/images/Download/逆旅.png';
import pop from '../../common/images/Download/video-bottom-mask.png';
import title1 from '../../common/images/Download/cover-video.png';
import active1 from '../../common/images/Download/video-active.png';
import more from '../../common/images/Download/more.png';
import line from '../../common/images/Download/line-img.png';
import cover2 from '../../common/images/Download/宇宙.png';
import title2 from '../../common/images/Download/cover-wallpaper.png';
import active2 from '../../common/images/Download/img-active.png';

import video from '../../common/video/birthday.mp4';


const Download = () => {

    const [currentVideo, setCurrentVideo] = useState(null);
    const [currentImg, setCurrentImg] = useState(null);
    return(
        <div className='Dowload'>
            <Side />
            <div className='galleryIcon'/>
            <div className='slogan-Vertical'/>
            <div className='linkong'/>
            <div className='right-Dot'/>
            <div className='right-Slogan'/>
            <div className='galleryIcon-content'>
                <div className='itemBox box-videobox'>
                    <div className='item-content'>
                        <div>
                            <img className='cover' src={cover1} alt="" />
                        </div>
                        <img className='pop' src={pop} alt="" />
                        <img className='title' src={title1} alt="" />
                        <img className='active' src={active1} alt=""/>
                        <div className='videoplay' onClick={() => setCurrentVideo(video)}/>
                        <img className='more' src={more} alt=""/>
                    </div>
                </div>
                <div className='itemBox box-imgbox'>
                    <img className='line' src={line} alt="" />
                    <div className='item-content'>
                        <div>
                            <img className='cover' src={cover2} alt="" />
                        </div>
                        <img className='pop' src={pop} alt="" />
                        <img className='title' src={title2} alt="" />
                        <img className='active' src={active2} />
                        <div className='imgplay' onClick={() => setCurrentImg(cover2)}/>
                        <img className='more' src={more} />
                    </div>
                </div>
                <div className='box-MMDbox'>
                    <div className='coverMMD'></div>
                    <div className='MMD'></div>
                </div>
            </div>
            {/*弹窗*/}
                <VideoModal 
                    videoSrc={currentVideo || ''}
                    isOpen={!!currentVideo}
                    onClose={() => setCurrentVideo(null)}
                />
                <Img
                    imgSrc={currentImg || ''}
                    isOpen={!!currentImg}
                    onClose={() => setCurrentImg(null)}
                />
        </div>
    )
};

export default Download
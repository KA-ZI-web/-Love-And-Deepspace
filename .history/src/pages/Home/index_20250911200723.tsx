
import Side from '../../components/Side/Side';
import './Home.css'

//资源引入
import video from '../../common/video/piano.mp4';
import codeTextImg from '../../common/images/Home/codetext.png';
import codeImg from '../../common/images/Home/code.png';
import appstoreImg from '../../common/images/Home/appstore.png';
import andriodImg from '../../common/images/Home/android.png';
import mumuImg from '../../common/images/Home/mumu.png';


export default function Home(){
        return (
            <div className='P-home'>
                <Side />
                <div className="video-box">
                    <video 
                        className="video-background" 
                        preload="auto" 
                        loop 
                        playsInline 
                        muted
                        autoPlay 
                        src={video}
                        />
                </div>
                <div className='warn'>
                    <p>为维护未成年人健康上网环境</p>
                    <p>本游戏暂不支持18岁以下用户登录体验</p>
                </div>
                <div className='uplowad'>
                    <img  className='codeTextImg' src={codeTextImg} alt="二维码说明" />
                    <div className='codeImg'>
                        <img src={codeImg} alt="二维码" />
                    </div>
                    <div className='download-buttons '>
                        <img  className='appstore'  src={appstoreImg} alt="App Store" />
                        <img  className='android' src={andriodImg} alt="Android" />
                    </div>
                    <img className='mumu' src={mumuImg} alt="Mumu模拟器" />
                </div>
               
            </div>
        )
    }

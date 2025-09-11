
import './Side.css'

import wechatImg from '../../common/images/Side/wechat.png';    
import wechat_qrcode from '../../common/images/Side/wechat_qrcode.png';    
import BilibiliImg from '../../common/images/Side/bilibili.png';    
import weblogImg from '../../common/images/Side/weblog.png';    
import shareImg from '../../common/images/Side/share.png';    
import qqImg from '../../common/images/Side/qq.png';    

const Side = () => {
  return (
    <div className='side'>
      <ul className='side_list'>
        <li className='side_item'><img src={wechatImg} alt='微信'/>
          <div className='wechat_qrcode-box'>
            <div className='wechat_qrcodehover'>
              <div className='wechat_qrcode'>
                <img src={wechat_qrcode} />
              </div>
              <span>扫码关注微信订阅号</span>
            </div>
          </div>
        </li>
        <li className='side_item'><img src={BilibiliImg} alt='b站'/></li>
        <li className='side_item'><img src={weblogImg} alt='微博'/></li>
        <li className='side_item'><img src={shareImg} alt='分享'/>
          <div className='share_img-box'>
            <div className='share_imghover'>
              <p className='share_img_front'>分享至</p>
              <ul className='share_img'>
                <li ><img src={weblogImg} alt='微博'/></li>
                <li ><img src={wechatImg} alt='微信' /></li>
                <li className='qqImg'><img src={qqImg} alt="QQ空间" /></li>
              </ul>
            </div>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Side;
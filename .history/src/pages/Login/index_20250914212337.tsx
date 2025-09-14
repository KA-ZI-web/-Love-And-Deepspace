//这个页面并没有真正显示，我是一页一页制作完成后用这个页面进行查看和修改
//最终在swiper-router.tsx页面中实现
import { Component } from 'react';
import { Link } from "react-router-dom";
import Header from '../../components/Header/Header';
import './Login.css'

class Login extends Component{
    render(){
        return (
            <div className='P-login'>
                <Header/>
                <h1>Login page</h1>
                <Link to="/home">登录页面 </Link>
                <Link to="/1">角色页面 </Link>
                <Link to="/2">战斗页面 </Link>
                <Link to="/3">下载页面 </Link>
                <Link to="/4">新闻页面 </Link>
                <Link to="/5">页面 </Link>
            </div>
        )
    }
}

export default Login 
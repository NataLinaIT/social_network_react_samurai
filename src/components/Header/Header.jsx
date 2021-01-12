import React from "react";
import logo from "../../logo.svg";
import s from "./Header.module.css";
import { NavLink } from "react-router-dom";
import HeaderUser from './HeaderUser';


let Header = (props) => {
  // console.log(props)
    return (
      <div className={s.header}>
        <div className={s.logo}>
          <img src={logo} alt="logo"></img>
          <div>Social</div>
          <div className={s.burger}>
            <div className={s.burger_line}></div>
            <div className={s.burger_line}></div>
            <div className={s.burger_line}></div>
          </div>
        </div>

        <div className={s.loginBlock}>
          {props.isAuth 
          ? <HeaderUser props={props} login={props.login} logout={props.logout} userImg={props.userImg}/>
          : <NavLink to={'/login'}> <button>Login</button> </NavLink>}
        
        </div>
      </div>
    );
  }

export default Header;

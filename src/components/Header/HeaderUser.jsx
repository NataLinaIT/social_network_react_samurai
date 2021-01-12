import React from "react";
import style from "./Header.module.css";
import logout_btn from "../../assets/icons/logout.png";

const HeaderUser = (props) => {
  // console.log(props)

  return (
    <div>
      {props.props.profile ? (
        <div className={style.userlogin_block}>
          <div className={style.image_small}>
            <img src={props.userImg? props.userImg : null} alt="img" />
          </div>
          <div> {props.login} </div>
          <div className={style.logout_btn} onClick={props.logout}><img src={logout_btn} alt="icon"/></div>
        </div>
      ) : null}
    </div>
  );
};

export default HeaderUser;

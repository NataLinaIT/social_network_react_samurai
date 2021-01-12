import React from "react";
import s from "./Message.module.css";
import image01 from "../../../assets/images/user_img.png"
import image02 from "../../../assets/images/friend_img.png"


const Message = (props) => {
  return (
    <div className={s.message_wrapper}>
      <img src={props.owner? image01 : image02} alt="face"/>
      <span>{props.message}</span>
    </div>
  );
};

export default Message;

import React from "react";
import s from "./Post.module.css";
import like from "../../../../assets/icons/like.png"
import user_default from "../../../../assets/images/user_default.png";

const Posts = (props) => {
  return (
    <div className={s.posts}>
      <div className={s.item}>
        <div className={s.image_wrapper}>
          <img src={props.photo? props.photo : user_default} alt="img" />
        </div>
        <div>{props.message} </div>
      </div>
      <div className={s.likes}>
        <div><img src={like} alt="like"/></div>
        <span>{props.likesCount}</span>
      </div>
    </div>
  );
};

export default Posts;

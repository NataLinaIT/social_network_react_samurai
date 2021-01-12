import React from "react";
import styles from "./Users.module.css";
import userPhoto from "../../assets/images/user_default.png";
import { NavLink } from "react-router-dom";
import style from "./Users.module.css";

let User = ({ user, fallowingInProgress, follow, unfollow }) => {
  return (
    <div className={style.userBlock}>
        <div className={style.userPhoto_wrapper}>
          <NavLink to={`/profile/${user.id}`}>
            <img
              src={user.photos.small != null ? user.photos.small : userPhoto}
              alt="img"
              className={styles.userPhoto}
            />
          </NavLink>
        </div>

        <div>
          <div>
            <div className={style.userName}>{user.name}</div>
            <div className={style.userStatus}>{user.status}</div>
          </div>

          <div>
            {user.followed ? (
              <button
                disabled={fallowingInProgress.some((id) => id === user.id)}
                onClick={() => {unfollow(user.id);}}
              > Unfollow
              </button>
            ) : (
              <button
                disabled={fallowingInProgress.some((id) => id === user.id)}
                onClick={() => {follow(user.id);}}
              > Follow
              </button>
            )}
          </div>
        </div>
    </div>
  );
};

export default User;

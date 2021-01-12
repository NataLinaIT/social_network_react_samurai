import React from "react";
import Paginator from "../common/Pagination/Pagination";
import User from "./User";
import style from "./Users.module.css";

let Users = ({
  currentPage,
  totalUsersCount,
  pageSize,
  onPageChanged,
  users,
  ...props
}) => {
  return (
    <div className={style.usersPageWrapper}>
      <div className={style.usersContainer}>
        {users.map((u) => (
          <User
            key={u.id}
            user={u}
            fallowingInProgress={props.fallowingInProgress}
            follow={props.follow}
            unfollow={props.unfollow}
          />
        ))}
      </div>

      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalUsersCount}
        pageSize={pageSize}
      />
    </div>
  );
};

export default Users;

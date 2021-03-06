import React from "react";
import { UserType } from "../../types/types";
import Paginator from "../common/Pagination/Pagination";
import User from "./User";
import style from "./Users.module.css";

type PropsTypes = {
  currentPage: number
  totalUsersCount: number
  pageSize: number
  onPageChanged: (pageNumber: number) => void
  users: Array<UserType>
  fallowingInProgress: Array<number>
  follow: () => void
  unfollow: () => void
}

let Users: React.FC<PropsTypes> = ({
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

import React from "react";
import { compose } from "redux";
import { connect } from "react-redux";
import {
  setCurrentPage,
  toggleFallowingInProgress,
  requestUsers,
  follow,
  unfollow,
} from "../../redux/users-reducer";
import {
  getUsers,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getFallowingInProgress,
} from "../../redux/users-selectors";
import Users from "./Users";
import Preloader from "../common/Preloader/Preloader";
import { UserType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStatePropsType = {
  users: Array<UserType>;
  pageSize: number;
  totalUsersCount: number;
  currentPage: number;
  isFetching: boolean;
  fallowingInProgress: Array<number>;
};

type MapDispatchPropsType = {
  follow:  (userId: number) => void;
  unfollow: (userId: number) => void;
  requestUsers: (currentPage: number, pageSize: number) => void;
  setCurrentPage: any;
  toggleFallowingInProgress: any;
};

type OwnPropsType = {
  pageTitle: string;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class UsersContainer extends React.Component<PropsType> {
  componentDidMount() {
    const { currentPage, pageSize } = this.props;
    this.props.requestUsers(currentPage, pageSize);
  }

  onPageChanged = (pageNumber: number) => {
    const { pageSize } = this.props;
    this.props.requestUsers(pageNumber, pageSize);
  };

  render() {
    return (
      <>
        {/* <h2>{this.props.pageTitle}</h2> */}
        {this.props.isFetching ? <Preloader /> : null}

        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          follow={this.props.follow}
          unfollow={this.props.unfollow}
          fallowingInProgress={this.props.fallowingInProgress}
        />
      </>
    );
  }
}

// let mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     fallowingInProgress: state.usersPage.fallowingInProgress
//   };
// };

let mapStateToProps = (state: AppStateType): MapStatePropsType => {
  return {
    users: getUsers(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    fallowingInProgress: getFallowingInProgress(state),
  };
};

export default compose(
  connect<MapStatePropsType, MapDispatchPropsType, OwnPropsType, AppStateType>(
    mapStateToProps,
    {
      follow,
      unfollow,
      setCurrentPage,
      toggleFallowingInProgress,
      requestUsers,
    }
  )
)(UsersContainer);

import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

const getUserSelector = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getUsers = createSelector(getUserSelector, (users) => {
  return users.filter((u) => true);
});


export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

export const getFallowingInProgress = (state: AppStateType) => {
  return state.usersPage.fallowingInProgress;
};

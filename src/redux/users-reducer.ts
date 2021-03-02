import { usersAPI } from "../api/api";
import { updateObjectInArray } from "../utils/object-helpers.js";
import { UserType } from "../types/types";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const TOGGLE_IS_FETCHING = "TOGGLE_IS_FETCHING";
const TOGGLE_IS_FALLOWING_PROGRESS = "TOGGLE_IS_FALLOWING_PROGRESS";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 12,
  totalUsersCount: 0,
  currentPage: 1,
  isFetching: false,
  fallowingInProgress: [] as Array<number>, //array of users id
};

type InitialStateType = typeof initialState;

//reduser
const usersReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case FOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case UNFOLLOW:
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case SET_USERS:
      return { ...state, users: action.users };
    case SET_CURRENT_PAGE:
      return { ...state, currentPage: action.currentPage };
    case SET_TOTAL_USERS_COUNT:
      return { ...state, totalUsersCount: action.count };
    case TOGGLE_IS_FETCHING:
      return { ...state, isFetching: action.isFetching };
    case TOGGLE_IS_FALLOWING_PROGRESS:
      return {
        ...state,
        fallowingInProgress: action.isFetching
          ? [...state.fallowingInProgress, action.userId]
          : state.fallowingInProgress.filter((id) => id !== action.userId),
      };
    default:
      return state;
  }
};

//action
type FollowSuccessActionType = {
  type: typeof FOLLOW 
  userId: number
}

export const followSuccess = (userId: number): FollowSuccessActionType => ({ type: FOLLOW, userId });

type UnfollowSuccessActionType = {
  type: typeof UNFOLLOW 
  userId: number
}

export const unfollowSuccess = (userId: number): UnfollowSuccessActionType => ({ type: UNFOLLOW, userId });

type SetUsersActionType = {
  type: typeof SET_USERS 
  users: Array<UserType>
}

export const setUsers = (users: Array<UserType>): SetUsersActionType => ({ type: SET_USERS, users });

type SetCurrentPageActionType = {
  type: typeof SET_CURRENT_PAGE 
  currentPage: number
}

export const setCurrentPage = (currentPage: number): SetCurrentPageActionType => ({
  type: SET_CURRENT_PAGE,
  currentPage,
});

type setTotalUsersCountActionType = {
  type: typeof SET_TOTAL_USERS_COUNT 
  count: number
}

export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCountActionType => ({
  type: SET_TOTAL_USERS_COUNT,
  count: totalUsersCount,
});

type toggleIsFetchingActionType = {
  type: typeof TOGGLE_IS_FETCHING 
  isFetching: boolean
}

export const toggleIsFetching = (isFetching: boolean): toggleIsFetchingActionType => ({
  type: TOGGLE_IS_FETCHING,
  isFetching,
});

type toggleFallowingInProgressActionType = {
  type: typeof TOGGLE_IS_FALLOWING_PROGRESS 
  isFetching: boolean
  userId: number
}

export const toggleFallowingInProgress = (isFetching: boolean, userId: number): toggleFallowingInProgressActionType => ({
  type: TOGGLE_IS_FALLOWING_PROGRESS,
  isFetching,
  userId,
});

//thunk
export const requestUsers = (page: number, pageSize: number) => {
  return async (dispatch: any) => {
    dispatch(toggleIsFetching(true));
    dispatch(setCurrentPage(page));

    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(toggleIsFetching(false));
    dispatch(setUsers(data.items));
    dispatch(setTotalUsersCount(data.totalCount));
  };
};

const followUnfollowFlow = async (
  dispatch: any,
  userId: number,
  apiMethod: any,
  actionCreator: any
) => {
  dispatch(toggleFallowingInProgress(true, userId));
  let response = await apiMethod(userId);
  if (response.data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(toggleFallowingInProgress(false, userId));
};

export const follow = (userId: number) => {
  return async (dispatch: any) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.follow.bind(usersAPI),
      followSuccess
    );
  };
};

export const unfollow = (userId: number) => {
  return async (dispatch: any) => {
    followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.unfollow.bind(usersAPI),
      unfollowSuccess
    );
  };
};

export default usersReducer;

import { authAPI, securityAPI, profileAPI } from "../api/api";
import { stopSubmit } from "redux-form";

const SET_USER_DATA = "SET_USER_DATA";
const GET_CAPTCHA_URL_SUCCESS = "GET_CAPTCHA_URL_SUCCESS";
const SET_USER_IMG = "SET_USER_IMG";

let initialState = {
  userId: null,
  email: null,
  login: null,
  isAuth: false,
  captchaUrl: null, //if null, captcha is not required
  userImg: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case SET_USER_IMG: {
      return {
        ...state,
        userImg: action.img,
      };
    }

    default:
      return state;
  }
};

//action creator

const setAuthUserData = (userId, email, login, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});
const setAuthUserImg = (img) => ({
  type: SET_USER_IMG,
  img,
});

const getCaptchaUrlSuccess = (captchaUrl) => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

//thunk
export const getAuthUserData = () => async (dispatch) => {
  const response = await authAPI.authUser();

  if (response.data.resultCode === 0) {
    const { id, email, login } = response.data.data;
    dispatch(setAuthUserData(id, email, login, true));
  }
};
export const login = (email, password, rememberMe, captcha) => async (
  dispatch,
  getState
) => {
  //login
  const response = await authAPI.login(email, password, rememberMe, captcha);
  if (response.data.resultCode === 0) {
    dispatch(getAuthUserData());
  } else {
    if (response.data.resultCode === 10) {
      dispatch(getCaptchaUrl());
    }
    let message =
      response.data.messages.length > 0
        ? response.data.messages[0]
        : "Some error";
    dispatch(stopSubmit("login", { _error: message }));
  }
  //set user foto in header
  const response2 = await profileAPI.getProfile(response.data.data.userId);
  dispatch(setAuthUserImg(response2.data.photos.small))
};
export const setUserImgInheader = (id) => async (dispatch) => {
  const response = await profileAPI.getProfile(id);
  dispatch(setAuthUserImg(response.data.photos.small))
}
export const getCaptchaUrl = () => async (dispatch) => {
  const response = await securityAPI.getCaptchaUrl();
  const captchaUrl = response.data.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};
export const logout = () => async (dispatch) => {
  const response = await authAPI.logout();
  if (response.data.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;

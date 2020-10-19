import * as actionTypes from "./types";
import axios from "../axios";

export const register = (name, email, password) => async (dispatch) => {
  dispatch({
    type: actionTypes.USER_REGISTER_REQUEST,
  });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users",
      { name, email, password },
      config
    );
    dispatch({
      type: actionTypes.USER_REGISTER_SUCCESS,
      payload: data,
    });
    dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });

    localStorage.setItem("shopee-userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_REGISTER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const login = (email, password) => async (dispatch) => {
  dispatch({ type: actionTypes.USER_LOGIN_REQUEST });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post(
      "/api/users/login",
      { email, password },
      config
    );
    dispatch({ type: actionTypes.USER_LOGIN_SUCCESS, payload: data });
    localStorage.setItem("shopee-userInfo", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: actionTypes.USER_LOGIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
export const logout = () => async (dispatch) => {
  dispatch({ type: actionTypes.USER_LOGOUT });
  dispatch({ type: actionTypes.ORDER_LIST_MY_RESET });
  dispatch({ type: actionTypes.USER_DETAILS_RESET });

  localStorage.removeItem("shopee-userInfo");
};

export const getUserDetails = (id) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.USER_DETAILS_REQUEST,
  });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/users/${id}`, config);
    dispatch({
      type: actionTypes.USER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.USER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateUserDetails = (user) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.USER_UPDATE_PROFILE_REQUEST,
  });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };
    const { data } = await axios.put(`/api/users/profile`, user, config);
    //console.log(data);
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_SUCCESS,
      payload: data,
    });
    setTimeout(() => {
      dispatch({
        type: actionTypes.USER_UPDATE_PROFILE_RESET,
      });
    }, 5000);
  } catch (error) {
    dispatch({
      type: actionTypes.USER_UPDATE_PROFILE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
    setTimeout(() => {
      dispatch({
        type: actionTypes.USER_UPDATE_PROFILE_RESET,
      });
    }, 5000);
  }
};

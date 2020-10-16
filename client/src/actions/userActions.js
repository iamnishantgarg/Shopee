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
    // const data = { email, password };
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
  localStorage.removeItem("shopee-userInfo");
};

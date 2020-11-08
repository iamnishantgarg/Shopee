import * as actionTypes from "./types";
import axios from "../axios";

export const listProducts = () => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_LIST_REQUEST });
    const res = await axios.get("/api/products");
    dispatch({ type: actionTypes.PRODUCT_LIST_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.PRODUCT_LIST_FAIL,
      payload:
        error.reposnse && error.reposnse.data.message
          ? error.reposnse.data.message
          : error.message,
    });
  }
};

export const createProduct = () => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.PRODUCT_CREATE_REQUEST,
  });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };
    const { data } = await axios.post("/api/products/", {}, config);
    dispatch({
      type: actionTypes.PRODUCT_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteProdcut = (id) => async (dispatch, getState) => {
  dispatch({
    type: actionTypes.PRODUCT_DELETE_REQUEST,
  });
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${getState().userLogin.userInfo.token}`,
      },
    };
    await axios.delete(`/api/products/${id}`, config);
    dispatch({
      type: actionTypes.PRODUCT_DELETE_SUCCESS,
    });
  } catch (error) {
    dispatch({
      type: actionTypes.PRODUCT_DELETE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: actionTypes.PRODUCT_DETAILS_REQUEST });
    const res = await axios.get("/api/products/" + id);
    dispatch({ type: actionTypes.PRODUCT_DETAILS_SUCCESS, payload: res.data });
  } catch (error) {
    console.log(error);
    dispatch({
      type: actionTypes.PRODUCT_DETAILS_FAIL,
      payload:
        error.reposnse && error.reposnse.data.message
          ? error.reposnse.data.message
          : error.message,
    });
  }
};

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

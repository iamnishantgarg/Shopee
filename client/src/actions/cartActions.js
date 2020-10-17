import * as actionTypes from "./types";
import axios from "../axios";
export const addItem = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);
  dispatch({
    type: actionTypes.CART_ADD_ITEM,
    payload: {
      product: data._id,
      countInStock: data.countInStock,
      name: data.name,
      image: data.image,
      price: data.price,
      qty: qty,
    },
  });
  // console.log(getState().cart.cartItems);
  localStorage.setItem(
    "shopee-cartItems",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const removeItem = (id) => async (dispatch, getState) => {
  dispatch({ type: actionTypes.CART_REMOVE_ITEM, payload: id });
  localStorage.setItem(
    "shopee-cartItems",
    JSON.stringify(getState().cart.cartItems)
  );
};

export const saveShippingAddress = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.SAVE_SHIPPING_ADDRESS,
    payload: data,
  });
  localStorage.setItem("shopee-shippingAddress", JSON.stringify(data));
};

export const savePaymentMethod = (data) => async (dispatch) => {
  dispatch({
    type: actionTypes.SAVE_PAYMENT_METHOD,
    payload: data,
  });
  localStorage.setItem("shopee-paymentMethod", JSON.stringify(data));
};

import * as actionTypes from "../actions/types";

export const orderCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ORDER_CREATE_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_CREATE_SUCCESS:
      return { loading: false, success: true, order: payload };
    case actionTypes.ORDER_CREATE_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { orderItems: [], shippingAddress: {}, loading: true },
  action
) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ORDER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case actionTypes.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: payload };
    case actionTypes.ORDER_DETAILS_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ORDER_PAY_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_PAY_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.ORDER_PAY_FAIL:
      return { loading: false, error: payload };
    case actionTypes.ORDER_PAY_RESET:
      return {};
    default:
      return state;
  }
};

export const orderDeliverReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ORDER_DELIVER_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_DELIVER_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.ORDER_DELIVER_FAIL:
      return { loading: false, error: payload };
    case actionTypes.ORDER_DELIVER_RESET:
      return {};
    default:
      return state;
  }
};

export const orderListMyReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ORDER_LIST_MY_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_LIST_MY_SUCCESS:
      return { loading: false, orders: payload };
    case actionTypes.ORDER_LIST_MY_FAIL:
      return { loading: false, error: payload };
    case actionTypes.ORDER_LIST_MY_RESET:
      return { orders: [] };
    default:
      return state;
  }
};

export const orderListReducer = (state = { orders: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.ORDER_LIST_REQUEST:
      return { loading: true };
    case actionTypes.ORDER_LIST_SUCCESS:
      return { loading: false, orders: payload };
    case actionTypes.ORDER_LIST_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

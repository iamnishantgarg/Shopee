import * as actionTypes from "../actions/types";

export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PRODUCT_LIST_REQUEST:
      return { ...state, products: [], loading: true };
    case actionTypes.PRODUCT_LIST_SUCCESS:
      return { ...state, products: payload, loading: false };
    case actionTypes.PRODUCT_LIST_FAIL:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PRODUCT_DETAILS_REQUEST:
      return { ...state, loading: true, error: null };
    case actionTypes.PRODUCT_DETAILS_SUCCESS:
      return { ...state, product: payload, loading: false };
    case actionTypes.PRODUCT_DETAILS_FAIL:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_DELETE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.PRODUCT_DELETE_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

export const productCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PRODUCT_CREATE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_CREATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case actionTypes.PRODUCT_CREATE_FAIL:
      return { loading: false, error: payload };
    case actionTypes.PRODUCT_CREATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productUpdateReducer = (state = { product: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PRODUCT_UPDATE_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_UPDATE_SUCCESS:
      return { loading: false, success: true, product: payload };
    case actionTypes.PRODUCT_UPDATE_FAIL:
      return { loading: false, error: payload };
    case actionTypes.PRODUCT_UPDATE_RESET:
      return {};

    default:
      return state;
  }
};

export const productReviewCreateReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.PRODUCT_CREATE_REVIEW_REQUEST:
      return { loading: true };
    case actionTypes.PRODUCT_CREATE_REVIEW_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.PRODUCT_CREATE_REVIEW_FAIL:
      return { loading: false, error: payload };
    case actionTypes.PRODUCT_CREATE_REVIEW_RESET:
      return {};

    default:
      return state;
  }
};

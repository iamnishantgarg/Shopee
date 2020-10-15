import * as actionType from "../actions/types";

export const productListReducer = (state = { products: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionType.PRODUCT_LIST_REQUEST:
      return { ...state, products: [], loading: true };
    case actionType.PRODUCT_LIST_SUCCESS:
      return { ...state, products: payload, loading: false };
    case actionType.PRODUCT_LIST_FAIL:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

export const productDetailsReducer = (state = { product: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionType.PRODUCT_DETAILS_REQUEST:
      return { ...state, product: {}, loading: true };
    case actionType.PRODUCT_DETAILS_SUCCESS:
      return { ...state, product: payload, loading: false };
    case actionType.PRODUCT_DETAILS_FAIL:
      return { ...state, error: payload, loading: false };

    default:
      return state;
  }
};

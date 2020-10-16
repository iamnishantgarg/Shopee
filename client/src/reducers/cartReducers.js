import * as actionTypes from "../actions/types";
export const cartReduce = (state = { cartItems: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.CART_ADD_ITEM:
      const existItem = state.cartItems.find(
        (item) => item.product === payload.product
      );
      if (existItem)
        return {
          ...state,
          cartItems: state.cartItems.map((item) =>
            item.product === payload.product ? payload : item
          ),
        };
      else {
        return { ...state, cartItems: [...state.cartItems, payload] };
      }
    case actionTypes.CART_REMOVE_ITEM:
      const isItemThere = state.cartItems.find(
        (item) => item.product === payload
      );
      if (isItemThere)
        return {
          ...state,
          cartItems: state.cartItems.filter((item) => item.product !== payload),
        };
      else {
        return state;
      }

    default:
      return state;
  }
};

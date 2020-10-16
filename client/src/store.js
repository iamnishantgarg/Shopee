import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  productListReducer,
  productDetailsReducer,
} from "./reducers/productReducers";
import { cartReduce } from "./reducers/cartReducers";
const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailsReducer,
  cart: cartReduce,
});

const cartItemsFromStorage = localStorage.getItem("shopee-cartItems")
  ? JSON.parse(localStorage.getItem("shopee-cartItems"))
  : [];

const initialState = { cart: { cartItems: cartItemsFromStorage } };
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);
export default store;

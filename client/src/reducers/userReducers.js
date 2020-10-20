import * as actionTypes from "../actions/types";
export const userLoginReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_LOGIN_REQUEST:
      return { loading: true };
    case actionTypes.USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case actionTypes.USER_LOGIN_FAIL:
      return { loading: false, error: payload };
    case actionTypes.USER_LOGOUT:
      return {};

    default:
      return state;
  }
};

export const userRegisterReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_REGISTER_REQUEST:
      return { loading: true };
    case actionTypes.USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case actionTypes.USER_REGISTER_FAIL:
      return { loading: false, error: payload };
    default:
      return state;
  }
};

export const userDetailsReducer = (state = { user: {} }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_DETAILS_REQUEST:
      return { ...state, loading: true };
    case actionTypes.USER_DETAILS_SUCCESS:
      return { loading: false, user: action.payload };
    case actionTypes.USER_DETAILS_FAIL:
      return { loading: false, error: payload };
    case actionTypes.USER_DETAILS_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userUpdateProfileReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_UPDATE_PROFILE_REQUEST:
      return { loading: true };
    case actionTypes.USER_UPDATE_PROFILE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case actionTypes.USER_UPDATE_PROFILE_FAIL:
      return { loading: false, error: payload };
    case actionTypes.USER_UPDATE_PROFILE_RESET:
      return {};
    default:
      return state;
  }
};

export const userListReducer = (state = { users: [] }, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_LIST_REQUEST:
      return { loading: true };
    case actionTypes.USER_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case actionTypes.USER_LIST_FAIL:
      return { loading: false, error: payload };
    case actionTypes.USER_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  const { type, payload } = action;
  switch (type) {
    case actionTypes.USER_DELETE_REQUEST:
      return { loading: true };
    case actionTypes.USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case actionTypes.USER_DELETE_FAIL:
      return { loading: false, error: payload };

    default:
      return state;
  }
};

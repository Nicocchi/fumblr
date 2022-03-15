import {
    REGISTER_USER_START,
    REGISTER_USER_SUCCESS,
    REGISTER_USER_FAILURE,
    LOGIN_USER_START,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAILURE,
    LOGOUT_USER_START,
    LOGOUT_USER_SUCCESS,
    VERIFY_LOGIN_START,
    VERIFY_LOGIN_SUCCESS,
    CHECK_TOKEN,
  } from "../../actions/auth";
  
  const initialState = {
    error: null,
    isRegistered: false,
    isLoggedIn: false,
    tokenExpired: false,
  };
  
  export const authReducer = (state = initialState, action) => {
    switch (action.type) {
      case REGISTER_USER_START:
        return { ...state, error: null };
      case REGISTER_USER_SUCCESS:
        return {
          ...state,
          error: null,
          isRegistered: action.payload,
          isLoggedIn: false,
        };
      case REGISTER_USER_FAILURE:
        return { ...state, error: action.payload, isLoggedIn: false };
      case LOGIN_USER_START:
        return { ...state, error: null };
      case LOGIN_USER_SUCCESS:
        return {
          ...state,
          error: null,
          isLoggedIn: true,
          tokenExpired: false,
        };
      case LOGIN_USER_FAILURE:
        return {
          ...state,
          error: action.payload,
          isLoggedIn: false,
          tokenExpired: false,
        };
      case VERIFY_LOGIN_START:
        return { ...state, error: null };
      case VERIFY_LOGIN_SUCCESS:
        return { ...state, isLoggedIn: action.payload };
      case LOGOUT_USER_START:
        return { ...state, error: null };
      case LOGOUT_USER_SUCCESS:
        return {
          ...state,
          isLoggedIn: action.payload,
          isRegistered: false,
          error: null,
        };
      case CHECK_TOKEN:
        return { ...state, tokenExpired: action.payload, error: null };
      default:
        return { ...state, error: null };
    }
  };
  
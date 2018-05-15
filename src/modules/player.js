import Api from "../api";
import isOk from "./helpers/response";
import { push } from "react-router-redux";

/* Constants */
const LOGIN_SUCCESS = "player/LOGIN_SUCCESS";
const LOGIN_FAILURE = "player/LOGIN_FAILURE";
const LOGIN_REQUESTED = "player/LOGIN_REQUESTED";

const REGISTER_SUCCESS = "player/REGISTER_SUCCESS";
const REGISTER_FAILURE = "player/REGISTER_FAILURE";
const REGISTER_REQUESTED = "player/REGISTER_REQUESTED";

const LOGOUT = "player/LOGOUT";

let initialState = {
  isLoggedIn: false,
  player: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return {
        ...state,
        player: action.player,
        isLoggedIn: true
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        player: null,
        isLoggedIn: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        player: action.player,
        isLoggedIn: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        player: null,
        isLoggedIn: false
      };
    default:
      return state;
  }
};

export const register = (email, password) => {
  return async dispatch => {
    dispatch({ type: REGISTER_REQUESTED });
    const response = await Api.registerPlayer(email, password);
    console.log(response);

    if (isOk(response)) {
      dispatch({ type: REGISTER_SUCCESS, player: response.player });
      dispatch(login(email, password));
    } else {
      dispatch({ type: REGISTER_FAILURE });
    }
  };
};

export const login = (email, password) => {
  console.log("LOGIN ACTION", email, password);
  return async dispatch => {
    dispatch({ type: LOGIN_REQUESTED });

    const response = await Api.loginPlayer(email, password);
    console.log(response);

    if (isOk(response)) {
      dispatch({ type: LOGIN_SUCCESS, player: response.player });
      dispatch(push("/dashboard"));
    } else {
      dispatch({ type: LOGIN_FAILURE });
    }
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch({ type: LOGOUT });
  };
};

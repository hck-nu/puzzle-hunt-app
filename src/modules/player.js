import Api from "../api";
import isOk from "./helpers/response";
import { push } from "react-router-redux";
import { TEAM_RECEIVED, LEFT_TEAM_SUCCESS } from "./team";
import { displayBanner } from "../modules/banner";

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
  player: null,
  token: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REGISTER_SUCCESS:
      return state;
    case REGISTER_FAILURE:
      return {
        ...state,
        player: null,
        token: null,
        isLoggedIn: false
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        player: action.player,
        token: action.token,
        isLoggedIn: true
      };
    case LOGIN_FAILURE:
      return {
        ...state,
        player: null,
        token: null,
        isLoggedIn: false
      };
    case TEAM_RECEIVED:
      return {
        ...state,
        player: {
          ...state.player,
          team_id: action.team ? action.team.id : null
        }
      };
    case LEFT_TEAM_SUCCESS:
      return {
        ...state,
        player: {
          ...state.player,
          team_id: null
        }
      };
    case LOGOUT:
      return {
        ...state,
        player: null,
        token: null,
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

    if (isOk(response)) {
      dispatch({ type: REGISTER_SUCCESS });
      dispatch(login(email, password));
    } else {
      dispatch({ type: REGISTER_FAILURE });
      dispatch(displayBanner("Registration failed! Please try again."));
    }
  };
};

export const login = (email, password) => {
  return async dispatch => {
    dispatch({ type: LOGIN_REQUESTED });
    const response = await Api.loginPlayer(email, password);
    if (isOk(response)) {
      let player = response.player;
      let token = response.player.Token;
      dispatch({
        type: LOGIN_SUCCESS,
        player: {
          username: player.username,
          team_id: player.team_id,
          id: player.id,
          email: player.email
        },
        token: token.value
      });
      dispatch(push("/dashboard"));
      dispatch(
        displayBanner("Welcome! Happy puzzle hunting!", "light-green", 3000)
      );
    } else {
      dispatch({ type: LOGIN_FAILURE });
      dispatch(
        displayBanner("Login failed! Please try again.", "light-red", 3000)
      );
    }
  };
};

export const logout = () => {
  return async dispatch => {
    dispatch(push("/login"));
    dispatch({ type: LOGOUT });
  };
};

export const goto = route => {
  return async dispatch => {
    dispatch(push(route));
  };
};

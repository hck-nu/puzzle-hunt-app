import { registerPlayer, loginPlayer } from "api";

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
      return state;
    default:
      return state;
  }
};

export const register = (email, password) => {
  return async dispatch => {
    dispatch({ type: REGISTER_REQUESTED });
    const response = await registerUser(email, password);

    if (response) {
      dispatch({ type: REGISTER_SUCCESS });
      // dispatch(login(email, password));
    } else {
      dispatch({
        type: REGISTER_FAILURE
      });
    }
  };
};

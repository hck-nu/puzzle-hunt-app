import Api from "../api";
import isOk from "./helpers/response";
import checkTokenAsync from "./helpers/token";

/* Constants */
const TEAM_REQUESTED = "team/TEAM_REQUESTED";
const TEAM_RECEIVED = "team/TEAM_RECEIVED";
const TEAM_FAILED = "team/TEAM_FAILED";

const TEAM_REGISTER_REQUESTED = "team/TEAM_REGISTER_REQUESTED";
const TEAM_REGISTER_SUCCESS = "team/TEAM_REGISTER_SUCCESS";
const TEAM_REGISTER_FAILED = "team/TEAM_REGISTER_FAILED";

let initialState = {
  team: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const getTeamById = id => {
  return async dispatch => {
    dispatch({ type: TEAM_REQUESTED });
    const response = await dispatch(checkTokenAsync(Api.getTeamById, id));
    console.log("RESPONSE", response);

    if (isOk(response)) {
      dispatch({ type: TEAM_RECEIVED, team: response.team });
    } else {
      dispatch({ type: TEAM_FAILED });
    }
  };
};

export const registerTeam = teamName => {
  return async dispatch => {
    dispatch({ type: TEAM_REGISTER_REQUESTED });
    const response = await dispatch(
      checkTokenAsync(Api.registerTeam, teamName)
    );
    console.log("RESPONSE", response);
    if (isOk(response)) {
      dispatch({ type: TEAM_REGISTER_SUCCESS });
    } else {
      dispatch({ type: TEAM_REGISTER_FAILED });
    }
  };
};

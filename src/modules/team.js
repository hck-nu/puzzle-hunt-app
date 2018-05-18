import Api from "../api";
import isOk from "./helpers/response";
import checkTokenAsync from "./helpers/token";
import { displayBanner } from "./banner";

/* Constants */
export const TEAM_RECEIVED = "team/TEAM_RECEIVED";
export const TEAM_NOT_RECEIVED = "team/TEAM_NOT_RECEIVED";

export const TEAM_FOUND = "team/TEAM_FOUND";
export const TEAM_NOT_FOUND = "team/TEAM_NOT_FOUND";

export const LEFT_TEAM_SUCCESS = "team/LEFT_TEAM_SUCCESS";
export const LEFT_TEAM_FAILURE = "team/LEFT_TEAM_FAILURE";

export const LEADERBOARD_SUCCESS = "team/LEADERBOARD_SUCCESS";
export const LEADERBOARD_FAILURE = "team/LEADERBOARD_FAILURE";

let initialState = {
  team: null,
  team_exists: false,
  leaderboard: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TEAM_RECEIVED:
      return {
        ...state,
        team: action.team
      };
    case TEAM_FOUND:
      return {
        ...state,
        team: null,
        team_exists: true
      };
    case TEAM_NOT_FOUND:
      return {
        ...state,
        team_exists: false
      };
    case LEFT_TEAM_SUCCESS:
      return {
        ...state,
        team: null,
        team_exists: false
      };
    case LEADERBOARD_SUCCESS:
      return {
        ...state,
        leaderboard: action.leaderboard
      };
    default:
      return state;
  }
};

export const getTeamById = id => {
  return async dispatch => {
    const response = await dispatch(checkTokenAsync(Api.getTeamById, id));

    if (isOk(response)) {
      dispatch({ type: TEAM_RECEIVED, team: response.team });
    } else {
      dispatch({ type: TEAM_RECEIVED });
    }
  };
};

export const getTeamByName = name => {
  return async dispatch => {
    const response = await dispatch(checkTokenAsync(Api.getTeamByName, name));

    if (isOk(response)) {
      dispatch({ type: TEAM_FOUND });
    } else {
      dispatch({ type: TEAM_NOT_FOUND });
    }
  };
};

export const submitTeam = teamName => {
  return async dispatch => {
    const response = await dispatch(checkTokenAsync(Api.submitTeam, teamName));
    if (isOk(response)) {
      if (response.meta.success) {
        dispatch({ type: TEAM_RECEIVED, team: response.team });
        dispatch(
          displayBanner("Successfully joined team!", "light-green", 3000)
        );
      }
    } else {
      dispatch({ type: TEAM_NOT_RECEIVED });

      if (response && response.source) {
        if (response.source === "full") {
          dispatch(
            displayBanner(
              "There is already the maximum amount of members on this team",
              "light-red",
              3000
            )
          );
        } else if (response.source === "member") {
          dispatch(
            displayBanner(
              "You are already a member of this team",
              "light-red",
              3000
            )
          );
        } else {
          dispatch(
            displayBanner("An unknown error occurred.", "light-red", 3000)
          );
        }
      } else {
        dispatch(
          displayBanner("An unknown error occurred.", "light-red", 3000)
        );
      }
    }
  };
};

export const getLeaderboard = () => {
  return async dispatch => {
    const response = await Api.getLeaderboard();
    if (isOk(response)) {
      dispatch({
        type: LEADERBOARD_SUCCESS,
        leaderboard: response.leaderboard
      });
    } else {
      dispatch({ type: LEADERBOARD_FAILURE });
    }
  };
};

export const leaveTeam = () => {
  return async dispatch => {
    const response = await dispatch(checkTokenAsync(Api.leaveTeam));

    if (isOk(response)) {
      dispatch({ type: LEFT_TEAM_SUCCESS, team: null });
      dispatch(
        displayBanner(
          "Good riddance. Successfully left your team!",
          "light-green",
          3000
        )
      );
    } else {
      dispatch(
        displayBanner(
          "Something went wrong! Please try again later.",
          "light-red",
          3000
        )
      );
      dispatch({ type: LEFT_TEAM_FAILURE });
    }
  };
};

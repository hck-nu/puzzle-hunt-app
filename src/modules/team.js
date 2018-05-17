import Api from "../api";
import isOk from "./helpers/response";
import checkTokenAsync from "./helpers/token";

/* Constants */
export const TEAM_RECEIVED = "team/TEAM_RECEIVED";
export const TEAM_NOT_RECEIVED = "team/TEAM_NOT_RECEIVED";

export const TEAM_FOUND = "team/TEAM_FOUND";
export const TEAM_NOT_FOUND = "team/TEAM_NOT_FOUND";

export const LEFT_TEAM_SUCCESS = "team/LEFT_TEAM_SUCCESS";
export const LEFT_TEAM_FAILURE = "team/LEFT_TEAM_FAILURE";

let initialState = {
  team: null,
  team_exists: false
};

export default (state = initialState, action) => {
  switch (action.type) {
    case TEAM_RECEIVED:
      console.log("team received in team");
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
      console.log("SUBMIT", response);
      dispatch({ type: TEAM_RECEIVED, team: response.team });
    } else {
      dispatch({ type: TEAM_NOT_RECEIVED });
    }
  };
};

// export const registerTeam = teamName => {
//   return async dispatch => {
//     const response = await dispatch(
//       checkTokenAsync(Api.registerTeam, teamName)
//     );

//     if (isOk(response)) {
//       dispatch({ type: TEAM_RECEIVED, team: response.team });
//     } else {
//       dispatch({ type: TEAM_NOT_RECEIVED });
//     }
//   };
// };

// export const joinTeam = id => {
//   return async dispatch => {
//     const response = await dispatch(checkTokenAsync(Api.joinTeam, id));

//     if (isOk(response)) {
//       if (response.success) {
//         console.log("JOIN");
//         dispatch({ type: TEAM_RECEIVED, team: response.team });
//       }
//     } else {
//       dispatch({ type: TEAM_NOT_RECEIVED });
//     }
//   };
// };

export const leaveTeam = () => {
  return async dispatch => {
    const response = await dispatch(checkTokenAsync(Api.leaveTeam));

    if (isOk(response)) {
      dispatch({ type: LEFT_TEAM_SUCCESS, team: null });
    } else {
      dispatch({ type: LEFT_TEAM_FAILURE });
    }
  };
};

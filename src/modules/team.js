import Api from "../api";
import isOk from "./helpers/response";

/* Constants */
const TEAM_REQUESTED = "puzzle/TEAM_REQUESTED";
const TEAM_RECEIVED = "puzzle/TEAM_RECEIVED";
const TEAM_FAILED = "player/TEAM_FAILED";

let initialState = {
  team: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const getTeamById = id => {};

export const registerTeam = teamName => {};

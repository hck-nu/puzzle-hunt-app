import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import puzzleReducer from "./puzzle";
import playerReducer from "./player";
import teamReducer from "./team";

export default combineReducers({
  router: routerReducer,
  puzzle: puzzleReducer,
  player: playerReducer,
  team: teamReducer
});

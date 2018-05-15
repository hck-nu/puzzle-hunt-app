import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import puzzleReducer from "./puzzle";
import playerReducer from "./player";

export default combineReducers({
  router: routerReducer,
  puzzle: puzzleReducer,
  player: playerReducer
});

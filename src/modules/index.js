import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";
import puzzleReducer from "./puzzle";

export default combineReducers({
  router: routerReducer,
  puzzle: puzzleReducer
});

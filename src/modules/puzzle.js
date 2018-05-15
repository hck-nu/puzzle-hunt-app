import Api from "../api";
import isOk from "./helpers/response";

/* Constants */
const PUZZLE_REQUESTED = "puzzle/PUZZLE_REQUESTED";
const PUZZLE_RECEIVED = "puzzle/PUZZLE_RECEIVED";
const PUZZLE_FAILED = "player/PUZZLE_FAILED";

let initialState = {
  puzzle: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PUZZLE_REQUESTED:
      return state;
    case PUZZLE_RECEIVED:
      console.log(action);
      return {
        ...state,
        puzzle: action.puzzle
      };
    case PUZZLE_FAILED:
      return state;
    default:
      return state;
  }
};

export const getPuzzle = id => {
  return async dispatch => {
    dispatch({ type: PUZZLE_REQUESTED });
    const response = await Api.getPuzzleById(id);

    if (isOk(response)) {
      dispatch({
        type: PUZZLE_RECEIVED,
        puzzle: response.puzzle
      });
    } else {
      dispatch({
        type: PUZZLE_FAILED
      });
    }
  };
};

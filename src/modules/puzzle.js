import Api from "../api";
import isOk from "./helpers/response";
import checkTokenAsync from "./helpers/token";

/* Constants */
const PUZZLE_REQUESTED = "puzzle/PUZZLE_REQUESTED";
const PUZZLE_RECEIVED = "puzzle/PUZZLE_RECEIVED";
const PUZZLE_FAILED = "puzzle/PUZZLE_FAILED";

const VERIFY_ANSWER_REQUESTED = "puzzle/VERIFY_ANSWER_REQUESTED";
const VERIFY_ANSWER_SUCCESS = "puzzle/VERIFY_ANSWER_SUCCESS";
const VERIFY_ANSWER_FAILURE = "puzzle/VERIFY_ANSWER_FAILURE";

let initialState = {
  puzzle: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case PUZZLE_REQUESTED:
      return state;
    case PUZZLE_RECEIVED:
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

export const verifyAndCompletePuzzle = (id, answer) => {
  return async dispatch => {
    dispatch({ type: VERIFY_ANSWER_REQUESTED });
    const response = await checkTokenAsync(Api.completePuzzle, id, answer);
    console.log(response);
    if (isOk(response)) {
      dispatch({ type: VERIFY_ANSWER_SUCCESS });
    } else {
      dispatch({ type: VERIFY_ANSWER_FAILURE });
    }
  };
};

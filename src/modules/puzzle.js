import Api from "../api";
import isOk from "./helpers/response";
import checkTokenAsync from "./helpers/token";

/* Constants */
const PUZZLE_REQUESTED = "puzzle/PUZZLE_REQUESTED";
const PUZZLE_RECEIVED = "puzzle/PUZZLE_RECEIVED";
const PUZZLE_FAILED = "puzzle/PUZZLE_FAILED";

const ALL_PUZZLES_REQUESTED = "puzzle/ALL_PUZZLES_REQUESTED";
const ALL_PUZZLES_SUCCESS = "puzzle/ALL_PUZZLES_SUCCESS";
const ALL_PUZZLES_FAILURE = "puzzle/ALL_PUZZLES_FAILURE";

const VERIFY_ANSWER_REQUESTED = "puzzle/VERIFY_ANSWER_REQUESTED";
const VERIFY_ANSWER_SUCCESS = "puzzle/VERIFY_ANSWER_SUCCESS";
const VERIFY_ANSWER_FAILURE = "puzzle/VERIFY_ANSWER_FAILURE";

let initialState = {
  puzzle: null,
  puzzles: []
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

    case ALL_PUZZLES_SUCCESS:
      return {
        ...state,
        puzzles: action.puzzles
      };
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

export const getAllPuzzles = () => {
  return async dispatch => {
    dispatch({ type: ALL_PUZZLES_REQUESTED });

    const response = await dispatch(checkTokenAsync(Api.getAllPuzzles));

    if (isOk(response)) {
      dispatch({ type: ALL_PUZZLES_SUCCESS, puzzles: response.puzzles });
    } else {
      dispatch({ type: ALL_PUZZLES_FAILURE });
    }
  };
};

export const verifyAndCompletePuzzle = (id, answer) => {
  return async dispatch => {
    dispatch({ type: VERIFY_ANSWER_REQUESTED });
    const response = await dispatch(
      checkTokenAsync(Api.completePuzzle, id, answer)
    );

    if (isOk(response)) {
      dispatch({ type: VERIFY_ANSWER_SUCCESS });
    } else {
      dispatch({ type: VERIFY_ANSWER_FAILURE });
    }
  };
};

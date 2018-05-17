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

const ACCESS_HINT_FAILURE = "puzzle/ACCESS_HINT_FAILURE";
const ACCESS_HINT_SUCCESS = "puzzle/ACCESS_HINT_SUCCESS";

const GET_ACCESSED_HINTS_SUCCESS = "puzzle/GET_ACCESSED_HINTS_SUCCESS";
const GET_ACCESSED_HINTS_FAILURE = "puzzle/GET_ACCESSED_HINTS_FAILURE";

let initialState = {
  puzzle: null,
  puzzles: [],
  accessed_hints: []
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
    case GET_ACCESSED_HINTS_SUCCESS:
      console.log("ACTION", action.accessed_hints);
      return {
        ...state,
        accessed_hints: action.accessed_hints
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

export const getAccessedHints = puzzleId => {
  return async dispatch => {
    const response = await dispatch(
      checkTokenAsync(Api.getAccessHints, puzzleId)
    );

    console.log(response);
    if (isOk(response)) {
      dispatch({
        type: GET_ACCESSED_HINTS_SUCCESS,
        accessed_hints: response.hints
      });
    } else {
      dispatch({
        type: GET_ACCESSED_HINTS_FAILURE
      });
    }
  };
};

export const accessHint = (puzzleId, hintId) => {
  return async dispatch => {
    const response = await dispatch(
      checkTokenAsync(Api.accessPuzzleHint, puzzleId, hintId)
    );
    console.log(response);
    if (isOk(response)) {
      dispatch({ type: ACCESS_HINT_SUCCESS });
      dispatch(getAccessedHints(puzzleId));
    } else {
      dispatch({ type: ACCESS_HINT_FAILURE });
    }
  };
};

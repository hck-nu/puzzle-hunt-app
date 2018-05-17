import Request from "../request";

const getPuzzleById = id => {
  return Request.get(`/puzzle/${id}`);
};

const completePuzzle = (token, id, answer) => {
  return Request.post(
    `/puzzle/${id}/complete`,
    Request.sign(
      {
        body: {
          answer
        }
      },
      token
    )
  );
};

const getAllPuzzles = token => {
  return Request.get("/puzzles", Request.sign({}, token));
};

const accessPuzzleHint = (token, puzzleId, hintId) => {
  return Request.post(
    `/puzzle/${puzzleId}/hint/${hintId}`,
    Request.sign({}, token)
  );
};

const getAccessHints = (token, puzzleId) => {
  return Request.get(`/puzzle/${puzzleId}/hints`, Request.sign({}, token));
};

export default {
  getPuzzleById,
  completePuzzle,
  getAllPuzzles,
  accessPuzzleHint,
  getAccessHints
};

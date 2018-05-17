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

export default {
  getPuzzleById,
  completePuzzle,
  getAllPuzzles
};

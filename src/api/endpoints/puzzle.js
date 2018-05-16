import Request from "../request";

const getPuzzleById = id => {
  return Request.get(`/puzzle/${id}`);
};

// TODO: game id
const completePuzzle = (token, id, answer) => {
  return Request.post(
    `/game/1/puzzle/${id}`,
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

const getAllPuzzles = () => {
  return Request.get("/puzzles", {});
};

export default {
  getPuzzleById,
  completePuzzle,
  getAllPuzzles
};

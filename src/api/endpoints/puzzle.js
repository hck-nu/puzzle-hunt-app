import Request from "../request";

const getPuzzleById = id => {
  return Request.get(`/puzzle/${id}`);
};

const completePuzzle = (token, id, answer) => {
  return Request.post(
    `/puzzle/${id}`,
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

export default {
  getPuzzleById
};

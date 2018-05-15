import Request from "../request";

const getPuzzleById = id => {
  console.log("GET PUZZLE BY ID");
  return Request.get(`/puzzle/${id}`);
};

export default {
  getPuzzleById
};

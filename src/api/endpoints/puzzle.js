import Request from "api/request";

const getPuzzleById = id => {
  return Request.get(`/puzzle/${id}`);
};

export default {
  getPuzzleById
};

import Request from "../request";

const loginPlayer = (email, password) => {
  return Request.post("/player/register", {
    body: {
      email,
      password
    }
  });
};

const registerPlayer = (email, password) => {
  return Request.post("/player/register", {
    body: {
      email,
      password
    }
  });
};

export default {
  loginPlayer,
  registerPlayer
};

import Request from "../request";

const registerTeam = (token, teamName) => {
  Request.get(`/team/${teamName}/register`, Request.sign({}, token));
};

const getTeamByName = (token, teamName) => {
  return Request.get(`/team/${teamName}`, Request.sign({}, token));
};

export default {
  getTeamByName
};

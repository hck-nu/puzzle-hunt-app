import Request from "../request";

const registerTeam = (token, teamName) => {
  return Request.post(`/team/${teamName}/register`, Request.sign({}, token));
};

const getTeamByName = (token, teamName) => {
  return Request.get(`/team/${teamName}`, Request.sign({}, token));
};

const leaveTeam = token => {
  return Request.post("/team/leave", Request.sign({}, token));
};

const joinTeam = (token, teamId) => {
  return Request.post(`/team/${teamId}/join`, Request.sign({}, token));
};

export default {
  registerTeam,
  getTeamByName,
  leaveTeam,
  joinTeam
};

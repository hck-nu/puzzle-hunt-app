const validateStringBasedOnRegex = function(arg, re) {
  if (!arg || typeof arg !== "string") {
    return false;
  }
  return re.test(arg);
};

const isEmail = function(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return validateStringBasedOnRegex(email, re);
};

/* 8 or more characters, with at least one letter and one number */
const isValidPassword = function(password) {
  const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
  return validateStringBasedOnRegex(password, re);
};

const isValidTeamName = function(teamName) {
  const re = /^[a-zA-Z0-9_]{3,}$/;
  return validateStringBasedOnRegex(teamName, re);
};

export default {
  isEmail,
  isValidPassword,
  isValidTeamName
};

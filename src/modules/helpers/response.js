const isOk = response => {
  return response && response.meta && response.meta.statusCode === 200;
};

export default isOk;

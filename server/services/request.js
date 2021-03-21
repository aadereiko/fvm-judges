const generateResponse = (data = null, err = '', msg = '') => ({
  data,
  err,
  msg,
});

module.exports = {
  generateResponse,
};

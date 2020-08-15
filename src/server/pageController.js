const { v4: uuidv4 } = require('uuid');

const ID_HEADER = 'client-id';

exports.index = (req, res) => {
  setClientId(req, res);
  res.render('index', { title: 'Exchange', script: 'index' });
};

exports.exchange = (req, res) => {};

// Set client id if there isn't one
const setClientId = (req, res) => {
  if (!req.cookies[ID_HEADER]) {
    res.cookie(ID_HEADER, uuidv4());
  }
};

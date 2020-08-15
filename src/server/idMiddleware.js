const { v4: uuidv4 } = require('uuid');

const ID_HEADER = 'client-id';

exports.handler = (req, res, next) => {
  // Set client id if there isn't one
  if (!req.cookies[ID_HEADER]) {
    res.cookie(ID_HEADER, uuidv4());
  }

  next();
};

const { v4: uuidv4 } = require('uuid');

const ID_COOKIE = 'client-id';

exports.handler = (req, res, next) => {
  // Set client id if there isn't one
  if (!req.cookies[ID_COOKIE]) {
    res.cookie(ID_COOKIE, uuidv4());
  }

  next();
};

exports.ID_COOKIE = ID_COOKIE;

const { v4: uuidv4 } = require('uuid');

const ID_COOKIE = 'client-id';

exports.handler = (req, res, next) => {
  // Set client id if there isn't one
  const userId = req.cookies[ID_COOKIE] || uuidv4();
  res.cookie(ID_COOKIE, userId);

  // Set it on the response locals for easier access within the request
  res.locals.userId = userId;

  next();
};

exports.ID_COOKIE = ID_COOKIE;

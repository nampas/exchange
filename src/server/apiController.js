const dataStore = require('./dataStore');
const { getUserId, exchangeDto } = require('./util');

exports.updateExchange = async (req, res) => {
  const { exchangeId } = req.params;
  const userId = getUserId(req);
  const message = req.body;
  const result = await dataStore.updateExchange(exchangeId, userId, message);

  if (!result) {
    res.status(404).send();
  } else {
    res.json(exchangeDto(userId, result));
  }
};

exports.createExchange = async (req, res) => {
  const exchangeId = await dataStore.createExchange(getUserId(req));

  res.json({ url: `/ex/${exchangeId}` });
};

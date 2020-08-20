const dataStore = require('./dataStore');
const { getUserId, exchangeDto } = require('./util');

exports.updateExchange = async (req, res) => {
  const { exchangeId } = req.params;
  const userId = getUserId(res);
  const { message } = req.body;
  const result = await dataStore.updateExchange(exchangeId, userId, message);

  if (!result) {
    res.status(404).send();
  } else {
    res.json(exchangeDto(userId, result));
  }
};

exports.createExchange = async (req, res) => {
  const exchangeId = await dataStore.createExchange(
    getUserId(res),
    req.body.prompt
  );

  res.json({ url: `/ex/${exchangeId}` });
};

exports.clearExchanges = async (req, res) => {
  const numRemoved = await dataStore.clearExchanges();
  res.json({ status: 'success', removed: numRemoved });
};

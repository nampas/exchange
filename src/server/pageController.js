const { getExchange } = require('./dataStore');
const { getUserId, exchangeDto } = require('./util');

exports.index = (req, res) => {
  res.render('index', { title: 'Exchange', script: 'index' });
};

exports.exchange = (req, res) => {
  const { exchangeId } = req.params;
  const userId = getUserId(req);
  const exchange = getExchange(exchangeId);

  if (!exchange) {
    res.status(404).send();
  } else if (!userIsAuthorized(userId, exchange)) {
    res.status(403).send();
  } else {
    const dto = exchangeDto(userId, exchange);
    res.render('exchange', {
      title: 'Exchange',
      script: 'exchange',
      exchange: dto,
    });
  }
};

const userIsAuthorized = (userId, exchange) => {
  if (!userId) {
    return false;
  }

  // User can access if they're on the exchange already, or if there's still
  // an empty spot on the exchange.
  return [exchange.creator, exchange.participant].some(
    (id) => !id || id === userId
  );
};

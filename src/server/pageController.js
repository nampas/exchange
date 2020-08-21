const { getExchangeAndMessages } = require('./dataStore');
const { getUserId, exchangeDto } = require('./util');

exports.index = (req, res) => {
  res.render('index', { title: 'Exchange', script: 'index' });
};

exports.exchange = async (req, res) => {
  const { exchangeId } = req.params;
  const userId = getUserId(res);
  const exchange = await getExchangeAndMessages(exchangeId);
  console.log(exchange);

  if (!exchange) {
    res.status(404).send();
  } else if (!userIsAuthorized(userId, exchange)) {
    res.status(403).send();
  } else {
    const dto = exchangeDto(userId, exchange);
    console.log(dto);
    res.render('exchange', {
      title: 'Exchange',
      script: 'exchange',
      exchange: dto,
    });
  }
};

const userIsAuthorized = (userId, { exchange, messages }) => {
  if (!userId) {
    return false;
  }

  if (messages.length < 2) {
    // Anyone can access if the exchange isn't finished
    return true;
  }

  if (exchange.creator === userId) {
    return true;
  }

  // Check if user is a participant
  return messages.map(({ author }) => author).some((id) => id === userId);
};

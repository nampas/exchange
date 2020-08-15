const { v4: uuidv4 } = require('uuid');

const tempDataStore = {};

exports.createExchange = (userId) => {
  const exchangeId = uuidv4();
  tempDataStore[exchangeId] = {
    creator: userId,
  };
  return exchangeId;
};

exports.getExchange = (exchangeId) => {
  return tempDataStore[exchangeId] || null;
};

exports.updateExchange = (exchangeId, userId, message) => {
  const exchange = tempDataStore[exchangeId];
  if (!exchange) {
    return null;
  }

  if (exchange.creator === userId) {
    // creator is submitting their message
    exchange.creatorMessage = message;
  } else if (!exchange.participant) {
    // participant is submitting their message
    exchange.participant = userId;
    exchange.participantMessage = message;
  } else {
    // the exchange has already been filled out
    throw new Error(
      `Cant update exchange ${exchangeId}, it's already complete`
    );
  }

  return exchange;
};

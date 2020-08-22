const { ID_COOKIE } = require('./idMiddleware');

exports.getUserId = (res) => {
  return res.locals.userId;
};

exports.exchangeDto = (userId, { exchange, messages }) => {
  const isComplete = messages.length >= 2;

  const dtoMessages = messages.reduce((acc, m) => {
    if (m.author === userId) {
      acc.userMessage = m.message;
    } else {
      acc.correspondantMessage = m.message;
    }
    return acc;
  }, {});

  return {
    prompt: exchange.prompt,
    status: isComplete ? 'complete' : 'messages',
    ...(isComplete ? dtoMessages : { userMessage: dtoMessages.userMessage }),
  };
};

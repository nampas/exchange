const { ID_COOKIE } = require("./idMiddleware");

exports.getUserId = (req) => {
  return req.cookies[ID_COOKIE];
};

exports.exchangeDto = (userId, exchange) => {
  const isComplete = exchange.creatorMessage && exchange.participantMessage;

  // Don't leak the participant's user id
  const messages =
    userId === exchange.creator
      ? {
          userMessage: exchange.creatorMessage,
          correspondantMessage: exchange.participantMessage,
        }
      : {
          userMessage: exchange.participantMessage,
          correspondantMessage: exchange.creatorMessage,
        };

  return isComplete
    ? { status: "complete", ...messages }
    : { status: "pending", userMessage: messages.userMessage };
};

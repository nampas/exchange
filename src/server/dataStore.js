const randomstring = require('randomstring');
const camelize = require('camelize');
const { query, connect, release } = require('./db');

const EXCHANGE_ID_PARAMS = { length: 12, charset: 'alphanumeric' };

const QUERIES = {
  EXCHANGES: {
    GET: 'select * from exchanges where external_id = $1',
    GET_COMPLETE:
      'select * from exchanges e left join exchange_messages em on em.exchange_id = e.external_id where e.external_id = $1',
    CREATE:
      'insert into exchanges(prompt, creator, external_id) values ($1, $2, $3) returning *',
  },
  MESSAGES: {
    CREATE:
      'insert into exchange_messages(exchange_id, author, message) values ($1, $2, $3) returning *',
  },
};

const doQuery = async (client, ...args) => {
  // If there's a client, use its query method. Otherwise use the pool's one
  const fn = client ? client.query.bind(client) : query;
  const result = await fn(...args);

  if (result.command === 'SELECT') {
    return camelize(result.rows);
  }
  if (result.command === 'INSERT') {
    return result.rowCount;
  }

  return result;
};

const createExchange = async (userId, prompt, client) => {
  const exchangeId = randomstring.generate(EXCHANGE_ID_PARAMS);
  await doQuery(client, QUERIES.EXCHANGES.CREATE, [prompt, userId, exchangeId]);
  return exchangeId;
};

const getExchange = async (exchangeId, client) => {
  return doQuery(client, QUERIES.EXCHANGES.GET, [exchangeId]);
};

const getExchangeAndMessages = async (exchangeId, client) => {
  const result = await doQuery(client, QUERIES.EXCHANGES.GET_COMPLETE, [
    exchangeId,
  ]);
  if (!result || !result.length) {
    return null;
  }

  return {
    exchange: {
      id: result[0].id,
      prompt: result[0].prompt,
      externalId: result[0].externalId,
      creator: result[0].creator,
    },
    messages: result
      .filter(({ author }) => author)
      .map((r) => ({
        author: r.author,
        message: r.message,
      })),
  };
};

const updateExchange = async (exchangeId, userId, message, c) => {
  let client = null;
  try {
    client = c || (await connect());

    const exchange = await getExchangeAndMessages(exchangeId, client);
    if (!exchange) {
      return null;
    }

    validateUpdate(exchange, userId, exchangeId);

    await doQuery(client, QUERIES.MESSAGES.CREATE, [
      exchangeId,
      userId,
      message,
    ]);
    exchange.messages.push({ author: userId, message });
    return exchange;
  } finally {
    // Release only if we made the client
    if (client && !c) {
      release(client);
    }
  }
};

const validateUpdate = ({ messages, exchange }, userId, exchangeId) => {
  if (messages.length > 1) {
    // the exchange has already been filled out
    throw new Error(
      `Cant update exchange ${exchangeId}, it's already complete`
    );
  }
};

exports.createExchange = createExchange;
exports.updateExchange = updateExchange;
exports.getExchange = getExchange;
exports.getExchangeAndMessages = getExchangeAndMessages;

/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('exchanges', {
    id: 'id',
    prompt: { type: 'text', notNull: true },
    creator: { type: 'uuid', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
  pgm.createTable('exchange_messages', {
    id: 'id',
    exchangeId: {
      type: 'integer',
      notNull: true,
      references: '"exchanges"',
    },
    author: { type: 'uuid', notNull: true },
    message: { type: 'text', notNull: true },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updatedAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('exchange.exchange_messages');
  pgm.dropTable('exchange.exchanges');
};

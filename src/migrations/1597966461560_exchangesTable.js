/* eslint-disable camelcase */

exports.up = (pgm) => {
  pgm.createTable('exchanges', {
    id: 'id',
    prompt: { type: 'text' },
    creator: { type: 'uuid', notNull: true },
    externalId: { type: 'varchar(40)', notNull: true },
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
  pgm.createTable('exchangeMessages', {
    id: 'id',
    exchangeId: { type: 'varchar(40)', notNull: true },
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
  pgm.dropTable('exchangeMessages');
  pgm.dropTable('exchanges');
};

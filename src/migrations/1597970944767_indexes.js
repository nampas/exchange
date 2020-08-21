/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createIndex('exchanges', 'externalId');
  pgm.createIndex('exchanges', 'creator');

  pgm.createIndex('exchangeMessages', 'author');
  pgm.createIndex('exchangeMessages', 'exchangeId');
};

exports.down = (pgm) => {
  pgm.dropIndex('exchanges', 'externalId');
  pgm.dropIndex('exchanges', 'creator');

  pgm.dropIndex('exchangeMessages', 'author');
  pgm.dropIndex('exchangeMessages', 'exchangeId');
};

const { Pool } = require('pg');

// Global to the runtime
let pool = null;

exports.initConnectionPool = async () => {
  pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 20,
  });

  // the pool will emit an error on behalf of any idle clients
  // it contains if a backend error or network partition happens
  pool.on('error', (err, client) => {
    console.error('Unexpected error on idle client, will try releasing', err);
    try {
      client.release();
    } catch (ex) {
      console.log('Release error: ', ex);
    }
  });
};

exports.connect = async () => {
  return pool.connect();
};

exports.release = (client) => {
  return client.release();
};

exports.query = (text, params) => {
  return pool.query(text, params);
};

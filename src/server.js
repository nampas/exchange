const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { default: migrationRunner } = require('node-pg-migrate');
const apiController = require('./server/apiController');
const pageController = require('./server/pageController');
const { idHandler, errorHandler } = require('./server/middleware');
const { initConnectionPool } = require('./server/db');

const PORT = 3000;

const initApp = () => {
  const app = express();

  app.set('view engine', 'ejs');
  app.set('views', './src/views');
  app.use('/assets', express.static('src/client'));
  app.use(cookieParser());
  app.use(bodyParser.json());

  // set the user id
  app.use(idHandler);

  // homepage
  app.get('/', errorHandler(pageController.index));

  // view an exchange
  app.get('/ex/:exchangeId', errorHandler(pageController.exchange));

  // update an exchange
  app.put('/ex/:exchangeId', errorHandler(apiController.updateExchange));

  // create an exchange
  app.post('/ex', errorHandler(apiController.createExchange));

  app.get('/internal/status', errorHandler(apiController.healthCheck));

  return app;
};

const migrateDb = async () => {
  return migrationRunner({
    databaseUrl: process.env.DATABASE_URL,
    dir: 'src/migrations',
    verbose: true,
    migrationsTable: 'migrations',
    direction: 'up',
    decamelize: true,
  });
};

migrateDb()
  .then(initConnectionPool)
  .then(initApp)
  .then((app) => {
    app.listen(PORT, () => {
      console.log(`exchange listening at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Failed to initialize app', error);
  });

const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { default: migrationRunner } = require('node-pg-migrate');
const apiController = require('./server/apiController');
const pageController = require('./server/pageController');
const { handler: idMiddleware } = require('./server/idMiddleware');
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
  app.use(idMiddleware);

  // homepage
  app.get('/', pageController.index);

  // view an exchange
  app.get('/ex/:exchangeId', pageController.exchange);

  // update an exchange
  app.put('/ex/:exchangeId', apiController.updateExchange);

  // create an exchange
  app.post('/ex', apiController.createExchange);

  // clear all exchanges. this will of course be removed in a real version of the app
  app.delete('/ex', apiController.clearExchanges);

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

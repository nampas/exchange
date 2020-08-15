const express = require('express');
const pageController = require('./server/pageController');
const apiController = require('./server/apiController');
const cookieParser = require('cookie-parser');
const { handler: idMiddleware } = require('./server/idMiddleware');

const PORT = 3000;

const app = express();
app.set('view engine', 'ejs');
app.set('views', './src/views');
app.use('/assets', express.static('src/client'));
app.use(cookieParser());

// set client id if necessary
app.use(idMiddleware);

// homepage
app.get('/', (req, res) => {
  pageController.index(req, res);
});

// view exchange
app.get('/{exchangeId}', (req, res) => {
  pageController.exchange(req, res);
});

// update an exchange
app.put('/{exchangeId}', (req, res) => {
  apiController.updateExchange(req, res);
});

// create an exchange
app.post('/exchange', (req, res) => {
  apiController.createExchange(req, res);
});

app.listen(PORT, () => {
  console.log(`exchange listening at http://localhost:${PORT}`);
});

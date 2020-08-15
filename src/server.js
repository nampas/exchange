const express = require('express');
const pageController = require('./server/pageController');
const apiController = require('./server/apiController');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { handler: idMiddleware } = require('./server/idMiddleware');

const PORT = 3000;

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
app.get('/ex/:exchangeId', pageController.exchange)

// update an exchange
app.put('/ex/:exchangeId', apiController.updateExchange);

// create an exchange
app.post('/ex', apiController.createExchange);

app.listen(PORT, () => {
  console.log(`exchange listening at http://localhost:${PORT}`);
});

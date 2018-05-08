const express = require('express');
const app = express();

const volleyball = require('volleyball');
app.use(volleyball);

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const path = require('path');
app.use('/js', express.static(path.resolve(__dirname, '../browser/js')));
app.use(express.static(path.resolve(__dirname, '../node_modules')));

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../browser/index.html'));
});

app.use('/api', require('./api'));

app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  console.error(err.stack);
  res.status(err.status || 500).send(err.message);
});

const db = require('./db');
db.sync()
.then(() => {
  console.log('db synced!');
  app.listen(3000, () => console.log('listening on port 3000'));
});

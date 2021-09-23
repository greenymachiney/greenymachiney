const path = require('path');
const express = require('express');

const { User, Drink } = require('./database');

const PORT = 3000;
const DIST_DIR = path.resolve(__dirname, '..', 'dist');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(DIST_DIR));



//BACKEND REQUESTS GO HERE












app.listen(PORT, () => {
  console.log(`
    Server is listening at:
    http://127.0.0.1:${PORT}
  `);
});

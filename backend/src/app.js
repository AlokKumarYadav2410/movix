const express = require('express');
const app = express();

const cookieParser = require('cookie-parser');
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send('Welcome to the Movix API');
})

module.exports = app;
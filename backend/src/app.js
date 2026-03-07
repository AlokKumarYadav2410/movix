const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const authRouter = require('./routes/auth.routes');

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use('/api/auth', authRouter);

app.use((err, req, res, next) => {
  console.error(err);

  res.status(500).json({
    success: false,
    message: "Internal Server Error"
  });
});

module.exports = app;
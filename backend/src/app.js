const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const apiLimiter = require("./middlewares/rateLimiter.middleware");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use("/api", apiLimiter)

const authRouter = require('./routes/auth.routes');
const favouriteRouter = require("./routes/favourite.routes");
const historyRouter = require("./routes/history.routes");
const movieRouter = require("./routes/movie.routes");
const userRouter = require("./routes/user.routes");
const testRoutes = require("./routes/test.routes");
const handleError = require("./middleware/error.middleware");


app.use('/api/auth', authRouter);
app.use("/api/favourites", favouriteRouter);
app.use("/api/history", historyRouter);
app.use("/api/movies", movieRouter);
app.use("/api/users", userRouter);
app.use("/api/test", testRoutes);

// app.use(handleError);

module.exports = app;
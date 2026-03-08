const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require("cors")
const { apiLimiter, authLimiter } = require("../src/middleware/rateLimiter.middleware");
const path = require("path");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin: true,
    credentials: true
}));

// correct public path
const publicPath = path.join(__dirname, "../public");

app.use(express.static(publicPath));

app.use("/api/auth/login", authLimiter)
app.use("/api/auth/register", authLimiter)
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

// React router support
app.use((req, res) => {
  res.sendFile(path.join(publicPath, "index.html"));
});

// app.use(handleError);

module.exports = app;
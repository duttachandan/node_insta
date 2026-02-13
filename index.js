require("dotenv").config();
const express = require("express");
const DBConnection = require("./app/config/db");
const logger = require("./app/utils/Logger");

const app = express();

// DB Connection
DBConnection();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Express Limiter
const rateLimit = require("./app/utils/ExpressRateLimit");
app.use(rateLimit);

// Creation of user
const userRoutes = require("./app/router/userRoutes");
app.use(userRoutes);

// middlewear for post routes
const PostRoutes = require("./app/router/PostRoutes");
app.use("/post", PostRoutes);

// middlewear for Comments
const CommentsRoutes = require("./app/router/CommentsRoutes");
app.use("/comments", CommentsRoutes);

// Handleing All the Error
app.use((err, req, res, next) => {
  logger.info(`${err.message || "Internal Server Error"}`);
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// Port Initiation
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT || 4000}`);
});

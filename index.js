require("dotenv").config();
const express = require("express");
const DBConnection = require("./app/config/db");

const app = express();
// DB Connection
DBConnection();

// middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// middlewear for post routes
const PostRoutes = require("./app/router/PostRoutes");
const { message } = require("./app/helper/PostValidation");
app.use("/post", PostRoutes);

// Handleing All the Error
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// middlewear for reviews
// const ReviewRoutes = require('./app/router/ReviewRoutes');
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT || 4000}`);
});

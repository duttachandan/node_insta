require("dotenv").config();
const express = require("express");
const DBConnection = require("./app/config/db");

const app = express();
// DB Connection
DBConnection();

// middleware
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

// middlewear for post routes
const PostRoutes = require("./app/router/PostRoutes");
app.use("/post", PostRoutes);

// middlewear for reviews
// const ReviewRoutes = require('./app/router/ReviewRoutes');
const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT || 4000}`);
});

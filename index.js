require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT;

// DB Connection
const main = require("./app/config/db");

// middleware
app.use(express.urlencoded({ extended: true }));

main();

// middlewear for post routes
const PostRoutes = require("./app/router/PostRoutes");
app.use("/post", PostRoutes);

// middlewear for reviews
// const ReviewRoutes = require('./app/router/ReviewRoutes');

app.listen(PORT, () => {
  console.log(`server is running on http://localhost:${PORT || 4000}`);
});

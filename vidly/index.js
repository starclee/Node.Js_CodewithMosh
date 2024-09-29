const express = require("express");
const app = express();
const morgan = require("morgan");
const mongoose = require("mongoose");
const config = require("config");

if (!config.get("jwtPrivateKey")) {
  console.log("FATEL ERROR: jwtPrivateKey is not defined");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost/vidly")
  .then(() => console.log("Mongo DB connection established..."))
  .catch((err) => console.error(err));

const genres = require("./routes/genres");
const customers = require("./routes/customers");
const movies = require("./routes/movies");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

app.use(express.json());

if (app.get("env") === "development") {
  app.use(morgan("short")); // for short logging purpose in the console
  // debug("Morgan Enabled...");
}

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/movies", movies);
app.use("/api/rentals", rentals);
app.use("/api/users", users);
app.use("/api/auth", auth);

const portNo = process.env.PORT || 3000; //$env:PORT=9000 to set env variables
app.listen(portNo, () => console.log("Listening on port " + portNo));

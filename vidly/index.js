const express = require("express");
const winston = require("winston");
const app = express();

require("./startup/logging")();
require("./startup/config")(app);
require("./startup/db")();
require("./startup/routes")(app);

const portNo = process.env.PORT || 3000;
const server = app.listen(portNo, () =>
  winston.info("Listening on port " + portNo)
);

module.exports = server;

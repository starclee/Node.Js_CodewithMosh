const winston = require("winston");
const mongoose = require("mongoose");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

module.exports = function () {
  mongoose
    .connect("mongodb://localhost/vidly")
    .then(() => logger.info("MongoDB connection established..."));
};

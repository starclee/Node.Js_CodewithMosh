const winston = require("winston");
const mongoose = require("mongoose");
const config = require("config");
const error = require("../middleware/error");

const logger = winston.createLogger({
  format: winston.format.combine(
    winston.format.colorize(),
    winston.format.prettyPrint(),
    winston.format.simple()
  ),
  transports: [new winston.transports.Console()],
});

module.exports = function () {
  let dbString = config.get("db");
  mongoose
    .connect(dbString)
    .then(() => logger.info(`Connected to Mongo Db...`))
    .catch((error) => {
      logger.error(error.message);
      logger.info("Application has been suspended... ");
      process.exit(1);
    });
};

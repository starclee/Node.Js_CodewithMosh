function log(req, res, next) {
  console.log("Req Logging...");
  next();
}

module.exports = log;

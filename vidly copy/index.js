const debug = require("debug")("app:startup");
const conDebug = require("debug")("app:config");

const express = require("express");
const config = require("config");

const app = express();
const morgan = require("morgan");

const logger = require("./middleware/logger");
const authentication = require("./middleware/authentication");

const genres = require("./routes/genres");

app.use(express.json());
app.use(logger);
app.use(authentication);
app.use(express.urlencoded({ extended: true })); // for key value paired url can be converted into req.body format
app.use(express.static("./public")); // to access the file in the node applciation

debug("Env: ", app.get("env"));

if (app.get("env") === "development") {
  app.use(morgan("short")); // for short logging purpose in the console
  debug("Morgan Enabled...");
}

conDebug("Name: ", config.get("name"));
conDebug("Mail Server: ", config.get("mail.host"));
conDebug("Mail Server Pwd: ", config.get("mail.password"));

app.use("/api/genres", genres);

const portNo = process.env.PORT || 3000;
app.listen(portNo, () => console.log("Listening on port " + portNo));

const express = require("express");
const home = require("./routes/home");
const courses = require("./routes/courses");
const logger = require("./middleware/logger");

const app = express();
app.use(express.json());
app.use(logger);
app.set("view engine", "pug");
app.set("views", "./views");

app.use("/", home);
app.use("/courses", courses);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`listening on ${port}`);
});

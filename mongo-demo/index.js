const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Mongo DB conenected successfully"))
  .catch((err) => console.error("Connection error: ", err));

let courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  tags: [String],
  isPublished: Boolean,
  Date: { type: Date, default: Date.now() },
});
const Course = mongoose.model("course", courseSchema);

async function addCourse() {
  const course = new Course({
    name: "Dev Ops",
    author: "Starc",
    tags: ["ops", "Cloud"],
    isPublished: true,
  });

  let result = await course.save();
  console.log("Result: ", result);
}
// addCourse();

async function getCourses() {
  const result = await Course
    .find()
    // .or([{name:/.*js.*/},{tags:/.*end.*/}])
    .and([{name:/.*js.*/},{tags:/.*op.*/}])
    // .limit(1)
    // .find({name: /.*Js.*/i})
    .sort({ name: 1 })
    .select({ name: 1, tags: 1 });

  console.log("Result:", result);
}
getCourses();

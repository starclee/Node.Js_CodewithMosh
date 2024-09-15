const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/mongo-exercises")
  .then(() => console.log("mongoDb connection succeed"))
  .catch(() => console.error("mongoDB connetion failed"));

const courseSchema = new mongoose.Schema({
  tags: [String],
  date: { type: Date, default: Date.now() },
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("course", courseSchema);

async function firstExercise() {
  return await Course.find({ isPublished: true, tags: "backend" })
    .sort({ name: 1 }) //"name","-name"
    .select({ name: 1, author: 1 }); //'name author'
}

async function secondExercise() {
  return await Course.find({
    isPublished: true,
    tags: { $in: ["frontend", "backend"] },
  })
    .sort("-price")
    .select("name author price");
}

async function thirdExercise() {
  return await Course.find({ isPublished: true })
    .or([
      {
        price: { $gte: 15 },
      },
      { name: /.*by.*/ },
    ])
    .select("name price");
}
(async function run() {
  // let courses = await firstExercise();
  // let courses = await secondExercise();
  let courses = await thirdExercise();
  console.log("Courses", courses);
})();

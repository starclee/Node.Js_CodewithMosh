const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/playground")
  .then(() => console.log("Mongo DB conenected successfully"))
  .catch((err) => console.error("Connection error: ", err));

let courseSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3,
    maxlength: 10,
    required: true,
    match: /^[a-zA-Z]/,
    uppercase: true, // Save as uppercase
  },
  author: {
    type: String,
    enum: ["starc", "Lee"],
    lowercase: true,
    trim: true,
  },
  tags: {
    type: Array,
    validate: {
      validator: (v) => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            if (v && v.length > 0) resolve(true);
            else reject("At least one tag is required");
          }, 3000);
        });
      },
      message: "At least one tag is required",
    },
  },
  isPublished: Boolean,
  Date: { type: Date, default: Date.now }, // Corrected field name
  price: {
    type: Number,
    min: 10,
    max: 100,
    get: (v) => Math.round(v), // Getter for price rounding
    required: function () {
      return this.isPublished;
    },
  },
});
const Course = mongoose.model("course", courseSchema);

async function addCourse() {
  const course = new Course({
    name: "DevOps",
    author: "Starc",
    tags: ["Web"],
    isPublished: true,
    price: 20.5,
  });

  try {
    let result = await course.save();
    console.log("Result: ", result);
  } catch (error) {
    console.log(error.message);
  }
}
// addCourse();

async function getCourses(id) {
  let pageNumber = 2;
  let pageSize = 10;
  const result = await Course.findById(id)
    // .or([{name:/.*js.*/},{tags:/.*end.*/}])
    // .and([{ name: /.*js.*/ }, { tags: /.*op.*/ }])
    // .limit(1)
    // .find({name: /.*Js.*/i})
    // .skip((pageNumber - 1) * pageSize) // Pagination
    // .sort({ name: 1 })
    .select({ name: 1, tags: 1, price: 1 });
  console.log("Result:", result);
}
getCourses("66e9bb88b0ab4ceb4fd295f5");

async function updateCourseQueryFirst(id) {
  let course = await Course.findById(id);
  // console.log("Find:", course);
  if (!course) return;
  course.set({
    isPublished: true,
    author: "Starc Lee",
  });

  let result = await course.save();
  console.log("Result: ", result);
}
// updateCourseQueryFirst("66e70cdbc5b39ef80e3c8b41");

async function updateCourseUpdateFirst(id) {
  // update - deprecated
  // updateOne -only update and returns status
  // findByIdAndUpdate -find & update the document and returns updated document
  const course = await Course.findByIdAndUpdate(
    { _id: id },
    {
      $set: {
        isPublished: true,
        author: "Stan",
      },
    },
    { new: true }
  );

  console.log("Update:", course);
}
// updateCourseUpdateFirst("66e70cdbc5b39ef80e3c8b41");

async function removeCourse(id) {
  // deleteOne - deletes the document and returns status ({_id: id});
  // findByIdAndDelete -find & remove the document and returns deleted document
  const result = await Course.findByIdAndDelete(id);
  console.log("Deleted", result);
}
// removeCourse("66e9b690745a99ff27242e10");

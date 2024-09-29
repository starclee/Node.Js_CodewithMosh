const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/embeddingDoc")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const authorSchema = new mongoose.Schema({
  name: String,
  bio: String,
  website: String,
});

const Author = mongoose.model("Author", authorSchema);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema({
    name: String,
    authors: [authorSchema],
  })
);

async function createCourse(name, authors) {
  const course = new Course({
    name,
    authors,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find();
  console.log(courses);
}

async function updateCourse(courseId) {
  const course = await Course.updateOne(
    { _id: courseId },
    {
      $set: {
        "author.name": "John Smith",
      },
    },
    { new: true }
  );

  console.log(course);
}

async function addCourse(id, author) {
  const course = await Course.findById(id);
  course.authors.push(author);
  console.log(await course.save());
}

async function removeAuthor(courseId, authorId) {
  const course = await Course.findById(courseId);
  let author = course.authors.id(authorId);
  author.deleteOne();
  console.log(course);
}

// createCourse("React Js Course", [
//   new Author({ name: "Mosh" }),
//   new Author({ name: "John" }),
// ]);

// listCourses();

// updateCourse("66f04597c541846bb563c031");

// addCourse("66f04fbb5e74a5c895b3fa6a", new Author({ name: "Stan" }));

// removeAuthor("66f04fbb5e74a5c895b3fa6a", "66f04fbb5e74a5c895b3fa68");

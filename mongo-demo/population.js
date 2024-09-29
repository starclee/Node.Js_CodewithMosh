const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/populateDoc")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

const Author = mongoose.model(
  "Author",
  new mongoose.Schema(
    {
      name: String,
      bio: String,
      website: String,
    },
    { versionKey: false }
  )
);

const Course = mongoose.model(
  "Course",
  new mongoose.Schema(
    {
      name: String,
      author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Author",
      },
    },
    { versionKey: false }
  )
);

async function createAuthor(name, bio, website) {
  const author = new Author({
    name,
    bio,
    website,
  });

  const result = await author.save();
  console.log(result);
}

async function createCourse(name, author) {
  const course = new Course({
    name,
    author,
  });

  const result = await course.save();
  console.log(result);
}

async function listCourses() {
  const courses = await Course.find()
    .populate("author", "name bio website -_id")
    .select("name author -_id");
  console.log(courses);
}

// createAuthor("Starc", "Dream util its your reality", "starc@lee.com");

// createCourse("Node.js Course", "66f044dbacd3a5b26e13b9f9");

listCourses();

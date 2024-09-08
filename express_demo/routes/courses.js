const express = require("express");
const Joi = require("joi");
const router = express.Router();

let courses = [
  {
    id: 1,
    name: "Node Js",
  },
  {
    id: 2,
    name: "React Js",
  },
  {
    id: 3,
    name: "Express Js",
  },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  let course = courses.find((i) => i.id === parseInt(req.params.id));
  if (!course)
    return res
      .status(404)
      .send("Requested courses not found in the list of courses!");
  res.send(course);
});

const schema = Joi.object({
  name: Joi.string().min(3).max(10).required(),
});
router.post("/", (req, res) => {
  const { error } = schema.validate(req.body);

  if (error)
    return res.status(400).send({ message: error?.details[0]?.message });

  let course = {
    id: courses.length + 1,
    name: req.body.name,
  };

  courses.push(course);
  res.send(course);
});

router.put("/:id", (req, res) => {
  //Lookup the course, if it exists proceed else return 404
  let course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    return res
      .status(404)
      .send("Updation requested course not found in the DB");

  //needs to be validated the new input else return the validation error
  let { error } = schema.validate(req.body);
  if (error)
    return res.status(400).send({ message: error?.details[0]?.message });

  //then update the course in the database and return the updated course details
  course.name = req.body.name;
  res.send(course);
});

router.delete("/:id", (req, res) => {
  //Lookup the course, if it exists proceed else return 404
  let course = courses.find((c) => c.id === parseInt(req.params.id));

  if (!course)
    return res
      .status(404)
      .send("Updation requested course not found in the DB");

  let index = courses.indexOf(course);
  courses.splice(index, 1);

  res.send(course);
});

module.exports = router;

const express = require("express");
const Joi = require("joi");
const router = express.Router();

let genres = [
  {
    id: 1,
    name: "Action",
  },
  {
    id: 2,
    name: "Adventure",
  },
  {
    id: 3,
    name: "Fantasy",
  },
  {
    id: 4,
    name: "Horror",
  },
  {
    id: 5,
    name: "Romance",
  },
  {
    id: 6,
    name: "Comedy",
  },
];

router.get("/", (req, res) => {
  const sortBy = req.query.sortBy;
  const order = req.query.order;
  if (sortBy) {
    if (order) {
      if (order === "desc") {
        genres.sort((a, b) => {
          if (a[sortBy] > b[sortBy]) return -1;
          if (a[sortBy] < b[sortBy]) return 1;
          return 0;
        });
      } else {
        genres.sort((a, b) => {
          if (a[sortBy] < b[sortBy]) return -1;
          if (a[sortBy] > b[sortBy]) return 1;
          return 0;
        });
      }
    } else {
      genres.sort((a, b) => {
        if (a[sortBy] < b[sortBy]) return -1;
        if (a[sortBy] > b[sortBy]) return 1;
        return 0;
      });
    }
  }
  res.status(200).send(genres);
});

router.get("/:id", (req, res) => {
  let genre = genres.find((gen) => gen.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send("No Genres found for given id");

  res.send(genre);
});

router.post("/", (req, res) => {
  let error = validateGenre(req.body);

  if (error) return res.status(400).send(error?.details?.[0]?.message);

  let genre = {
    id: genres.length + 1,
    name: req.body.name,
  };

  genres.push(genre);
  res.send(genre);
});

router.put("/:id", (req, res) => {
  let genre = genres.find((gen) => gen.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send("No Genres found for given id");

  let error = validateGenre(req.body);

  if (error) return res.status(400).send(error?.details?.[0]?.message);

  genre.name = req.body.name;
  res.send(genre);
});

router.delete("/:id", (req, res) => {
  let genre = genres.find((gen) => gen.id === parseInt(req.params.id));

  if (!genre) return res.status(404).send("No Genres found for given id");

  let index = genres.indexOf(genre);
  genres.splice(index, 1);
  res.send(genre);
});

function validateGenre(genre) {
  let schema = Joi.object({
    name: Joi.string().min(3).max(12).required(),
  });

  let { error } = schema.validate(genre);
  return error;
}

module.exports = router;

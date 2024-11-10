let request = require("supertest");
let { Genre } = require("../../models/genre");

let server;

describe("/api/genres", () => {
  beforeEach(() => {
    server = require("../../index");
  });

  afterEach(async () => {
    server.close();
    await Genre.deleteMany({});
  });

  describe("GET /", () => {
    it("should return all genres", async () => {
      await Genre.collection.insertMany([
        {
          name: "Genre1",
        },
        {
          name: "Genre2",
        },
      ]);

      let res = await request(server).get("/api/genres");
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some((x) => x.name === "Genre1")).toBeTruthy();
      expect(res.body.some((x) => x.name === "Genre2")).toBeTruthy();
    });
  });

  describe("GET /:id", () => {
    it("Should return the valid genre for the given id", async () => {
      let genre = new Genre({ name: "Genre" });
      await genre.save();

      let res = await request(server).get("/api/genres/" + genre._id);
      // console.log({ genre,res : res.body });
      expect(res.status).toBe(200);
      expect(res.body).toHaveProperty("name", genre.name);
    });

    it("Should return 404 status if invalid id passed", async () => {
      let res = await request(server).get("/api/genres/" + 2);
      expect(res.status).toBe(404);
    });
  });

  describe("POST", () => {
    it("Should return 401 error if client is not authenticated", async () => {
      const res = await request(server)
        .post("/api/genres")
        .send({ name: "genre1" });
      expect(res.status).toBe(401);
    });
  });
});

const { Rental } = require("../../models/rental");
const mongoose = require("mongoose");

describe("/api/returns", () => {
  let server, customerId, movieId, rental;
  beforeEach(async () => {
    server = require("../../index");

    customerId = new mongoose.Types.ObjectId();
    movieId = new mongoose.Types.ObjectId();

    rental = new Rental({
      customer: {
        _id: customerId,
        name: "12345",
        mobileNo: "6789090900",
      },
      movie: {
        _id: movieId,
        title: "12345",
        dailyRentalRate: 2,
      },
    });

    await rental.save();
  });

  afterEach(async () => {
    await Rental.deleteMany({});
    server.close();
  });

  it("Should work !", async () => {
    let res = await Rental.findById({ _id: rental._id });

    expect(res).not.toBeNull();
  });
});

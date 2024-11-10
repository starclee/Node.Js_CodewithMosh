const exercise = require("../exercise1");

describe("exercise 1", () => {
  it("Throw an error if not a number", () => {
    expect(() => exercise.fizzBuzz("i")).toThrow();
  });

  it("Should be return a FizzBuzz", () => {
    expect(exercise.fizzBuzz(15)).toBe("FizzBuzz");
  });

  it("Should be return a Fizz", () => {
    expect(exercise.fizzBuzz(18)).toBe("Fizz");
  });

  it("Should be return a Buzz", () => {
    expect(exercise.fizzBuzz(10)).toBe("Buzz");
  });

  it("Should be return a input", () => {
    expect(exercise.fizzBuzz(2)).toBe(2);
  });
});

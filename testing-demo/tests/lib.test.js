const lib = require("../lib");
const db = require("../db");
const mail = require("../mail");

describe("absolute", () => {
  it("In - Positive, Out - Positive", () => {
    const res = lib.absolute(34);
    expect(res).toBe(34);
  });

  it("In - Negative, Out - Positive", () => {
    const res = lib.absolute(-89);
    expect(res).toBe(89);
  });

  it("In - 0, Out - 0", () => {
    const res = lib.absolute(0);
    expect(res).toBe(0);
  });
});

describe("greet", () => {
  it("Greeting a person with their name", () => {
    expect(lib.greet("Starc Lee")).toMatch(/Starc Lee/);
    expect(lib.greet("Starc Lee")).toContain("Starc Lee");
  });
});

describe("getCurrency", () => {
  it("Returns a currency", () => {
    expect(lib.getCurrencies()).toEqual(
      expect.arrayContaining(["USD", "AUD", "EUR"])
    );
  });
});

describe("getProduct", () => {
  it("return object prop based on id", () => {
    // deep equality
    // expect(lib.getProduct(1)).toStrictEqual({id:1,price:10})

    // checking these two {props:value}  if available - Pass...
    expect(lib.getProduct(1)).toMatchObject({ id: 1, price: 10 });

    //Specific properties
    expect(lib.getProduct(1)).toHaveProperty("id", 1);
  });
});

describe("registerUser", () => {
  it("throw an error if username is invalid", () => {
    let arr = [null, NaN, undefined, 0, false, ""];
    arr.forEach((i) =>
      expect(() => {
        lib.registerUser(i);
      }).toThrow()
    );
  });

  it("should return an object having username and id", () => {
    let result = lib.registerUser("Mosh");
    expect(result).toMatchObject({ username: "Mosh" });
    expect(result.id).toBeGreaterThan(0);
  });
});

describe("applyDiscount", () => {
  it("should be apply 10 % discount while customer having >10 points", () => {
    //Mock Function
    db.getCustomerSync = function (customerId) {
      console.log("Mock GetCustomerSync Function");
      return { id: customerId, points: 20 };
    };

    let order = { id: 1, totalPrice: 10 };
    lib.applyDiscount(order);
    expect(order.totalPrice).toBe(9);
  });
});

describe("notifyCustomer", () => {
  it("should notify customer via email", () => {
    db.getCustomerSync = jest.fn().mockReturnValue({ email: "ashes@One.com" });
    // mockResolvedValue()
    // mockRejectedValue()
    mail.send = jest.fn();

    lib.notifyCustomer({ customerId: 1 });
    expect(mail.send).toHaveBeenCalled();
    expect(mail.send.mock.calls[0][0]).toBe("ashes@One.com");
    expect(mail.send.mock.calls[0][1]).toMatch(/order/);
  });
});

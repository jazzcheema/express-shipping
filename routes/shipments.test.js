"use strict";
const fetchMock = require('fetch-mock');
const shipItApi = require("../shipItApi");
shipItApi.shipProduct = jest.fn();

const request = require("supertest");
const app = require("../app");
// const fetchMock = require('fetch-mock');




describe("POST /", function () {
  // test("valid", async function () {
  //   const resp = await request(app).post("/shipments").send({
  //     productId: 1000,
  //     name: "Test Tester",
  //     addr: "100 Test St",
  //     zip: "12345-6789",
  //   });

  //   expect(resp.body).toEqual({ shipped: expect.any(Number) });
  // });

  test("throws error if empty request body", async function () {
    const resp = await request(app)
      .post("/shipments")
      .send();
    expect(resp.statusCode).toEqual(400);
  });

  test("throws error if invalid input", async function () {
    const resp = await request(app).post("/shipments").send({
      productId: 100,
      name: 12,
      addr: "",
      zip: 12345,
    });
    expect(resp.statusCode).toEqual(400);
  });

  //TODO: dont need fetchmock or anything else below..
  test("Mock test to simulated endpoint", async function () {
    shipItApi.shipProduct.mockReturnValue(6000);
    const resp = await request(app).post("/shipments").send({
      productId: 1000,
      name: "Test Tester",
      addr: "100 Test St",
      zip: "12345-6789",
    });
    expect(resp.body).toEqual({ "shipped": 6000 });
  });
});

"use strict";

const fetchMock = require('fetch-mock');
const {
  shipProduct, SHIPIT_SHIP_URL, SHIPIT_API_KEY
} = require("./shipItApi");

test("shipProduct", async function () {
  // const shipId = await shipProduct({
  //   productId: 1000,
  //   name: "Test Tester",
  //   addr: "100 Test St",
  //   zip: "12345-6789",
  // });
  fetchMock.post(SHIPIT_SHIP_URL, {
    body: JSON.stringify({
      "receipt": {
        "name": "jazz2",
        "addr": "19042 Main Street",
        "zip": "92646",
        "shipId": 5359
      }
    }),
    status: 201
  });

  const res = await shipProduct({
    name: "jazz2",
    addr: "19042 Main Street",
    zip: "92646",
    key: SHIPIT_API_KEY,
    productId: 1000
  });

  // const receipt = await res.receipt
  // console.log('res = ', res)
  // console.log('receipt = ', receipt)

  expect(res).toEqual(5359);
})


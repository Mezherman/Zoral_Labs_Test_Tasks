const sortSalesByAmount = require("./js_task2");

const initialSalesArray = [
  { amount: 1000, quantity: 10 },
  { amount: 1, quantity: 5 },
  { amount: 17, quantity: 20 },
  { amount: 5, quantity: 1 },
  { amount: 3, quantity: 3 },
  { amount: 700, quantity: 17 },
  { amount: -100, quantity: 6 },
];

test("sorts by Sales in Ascending order", () => {
  const salesArraySortedAsc = [
    { amount: -100, quantity: 6 },
    { amount: 1, quantity: 5 },
    { amount: 3, quantity: 3 },
    { amount: 5, quantity: 1 },
    { amount: 17, quantity: 20 },
    { amount: 700, quantity: 17 },
    { amount: 1000, quantity: 10 },
  ];

  expect(sortSalesByAmount(initialSalesArray, "asc"))
    .toEqual(salesArraySortedAsc)
});

test("sorts by Sales in Descending order", () => {
  const salesArraySortedDesc = [
    { amount: 1000, quantity: 10 },
    { amount: 700, quantity: 17 },
    { amount: 17, quantity: 20 },
    { amount: 5, quantity: 1 },
    { amount: 3, quantity: 3 },
    { amount: 1, quantity: 5 },
    { amount: -100, quantity: 6 },
  ];

  expect(sortSalesByAmount(initialSalesArray, "desc"))
    .toEqual(salesArraySortedDesc)
});

test("checks for incorrect sorting order type", () => {
  expect(sortSalesByAmount(initialSalesArray, "wrong sorting order"))
    .toBe("Please, choose correct sorting order [asc, desc]")
});

test("checks whether sales figures are valid", () => {
  expect(sortSalesByAmount([...initialSalesArray, { amount: "string", quantity: 5 }]))
    .toEqual("Sales amount should be a Number");

  expect(sortSalesByAmount([...initialSalesArray, { amount: [], quantity: 5 }]))
    .toEqual('Sales amount should be a Number');

  expect(sortSalesByAmount([...initialSalesArray, { amount: {}, quantity: 5 }]))
    .toEqual('Sales amount should be a Number');

  expect(sortSalesByAmount([...initialSalesArray, { amount: "", quantity: 5 }]))
    .toEqual('Sales amount should be a Number');

  expect(sortSalesByAmount([...initialSalesArray, { amount: "   ", quantity: 5 }]))
    .toEqual('Sales amount should be a Number');

  expect(sortSalesByAmount([...initialSalesArray, {}]))
    .toEqual('Sales amount should be a Number');
});

test("checks whether initial Sales array remains intact", () => {
  expect(sortSalesByAmount(initialSalesArray))
    .not.toBe(initialSalesArray)
});
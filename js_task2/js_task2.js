function sortSalesByAmount(salesArrayUnsorted, sortingOrder = "asc") {
  const sortingTypes = ["asc", "desc"];

  if (!sortingTypes.includes(sortingOrder)) {
    return "Please, choose correct sorting order [asc, desc]";
  }

  for (let i = 0; i < salesArrayUnsorted.length; i++) {
    const salesAmount = salesArrayUnsorted[i].amount;

    if (!["number", "string"].includes(typeof salesAmount)) {
      return "Sales amount should be a Number";
    } else if (salesAmount.toString().trim().length === 0 || isNaN(+salesAmount)) {
      return "Sales amount should be a Number";
    }
  }

  const salesArraySorted = [...salesArrayUnsorted]
    .sort((a, b) => compareSales(a, b, sortingOrder));

  return salesArraySorted;
}

function compareSales(a, b, sortingOrder) {
  const salesA = a.amount;
  const salesB = b.amount;

  let result = 0;

  if (salesA > salesB) {
    result = 1
  } else if (salesA < salesB) {
    result = -1
  }

  return sortingOrder === "asc" ? result : -result;
}

module.exports = sortSalesByAmount;

/********* RUN *********/
const initialSalesArray = [
  { amount: 1000, quantity: 10 },
  { amount: 1, quantity: 5 },
  { amount: 17, quantity: 20 },
  { amount: 5, quantity: 1 },
  { amount: 3, quantity: 3 },
  { amount: 700, quantity: 17 },
  { amount: -100, quantity: 6 },
];

console.log("Answer:", sortSalesByAmount(initialSalesArray, "asc"));
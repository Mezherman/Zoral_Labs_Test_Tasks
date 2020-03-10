Date.prototype.daysTo = function (comparedDate) {
  const initialDate = this;

  if (!comparedDate) return "No date given for comparison";

  if (Object.prototype.toString.call(comparedDate) !== "[object Date]"
    || comparedDate.toString() === "Invalid Date") {
    return "Compared date is invalid";
  }

  if (initialDate.toString() === "Invalid Date") return "Initial date is invalid";

  const daysDiff = Math.floor((comparedDate - initialDate) / 86400000);

  return daysDiff;
};


/********* RUN *********/
const d1 = new Date(2019, 11, 31);
const d2 = new Date();
console.log("Answer:", d1.daysTo(d2));
function objectProjection(objSource, objPrototype) {
  let objProjected = {};

  for (const key in objSource) {
    if (Object.prototype.hasOwnProperty.call(objPrototype, key)) {
      if (objSource[key] instanceof Object && objPrototype[key] instanceof Object) {
        objProjected[key] = objectProjection(objSource[key], objPrototype[key])
      } else {
        objProjected[key] = objSource[key];
      }
    }
  }

  return objProjected;
}

/********* RUN *********/
let objSource = {
  prop11: {
    prop21: 21,
    prop22: {
      prop31: 31,
      prop32: 32
    }
  },
  prop12: 12
};

let objPrototype = {
  prop11: {
    prop22: {
      prop32: ""
    }
  },
  prop13: ""
};

console.log("Answer:", objectProjection(objSource, objPrototype));
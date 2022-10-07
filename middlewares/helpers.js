const isObject = (object) => {
  return object != null && typeof object === 'object';
};

/**
 * 
 * @description compares that two objects are equal
 * @param {Object} object1 
 * @param {Object} object2 
 * @returns boolean
 */
const isDeepEqual = (object1, object2) => {
  const objKeys1 = Object.keys(object1);
  const objKeys2 = Object.keys(object2);

  if (objKeys1.length !== objKeys2.length) return false;

  for (var key of objKeys1) {
    const value1 = object1[key];
    const value2 = object2[key];

    const areObjects = isObject(value1) && isObject(value2);

    if ((areObjects && !isDeepEqual(value1, value2)) ||
      (!areObjects && value1 !== value2)
    ) {
      return false;
    }
  }
  return true;
};

module.exports = { isDeepEqual };

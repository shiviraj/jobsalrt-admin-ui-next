const cloneObject = obj => JSON.parse(JSON.stringify(obj))

const arraysMatch = function (arr1, arr2) {
  if (arr1.length !== arr2.length) return false;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false;
  }
  return true;
};

const compare = function (item1, item2, key, diffs) {
  const type1 = Object.prototype.toString.call(item1);
  const type2 = Object.prototype.toString.call(item2);

  if (type2 === '[object Undefined]') {
    diffs[key] = null;
    return;
  }

  if (type1 !== type2) {
    diffs[key] = item2;
    return;
  }

  if (type1 === '[object Object]') {
    const objDiff = diff(item1, item2);
    if (Object.keys(objDiff).length > 0) {
      diffs[key] = objDiff;
    }
    return;
  }

  if (type1 === '[object Array]') {
    if (!arraysMatch(item1, item2)) {
      diffs[key] = item2;
    }
    return;
  }

  if (type1 === '[object Function]') {
    if (item1.toString() !== item2.toString()) {
      diffs[key] = item2;
    }
  } else {
    if (item1 !== item2) {
      diffs[key] = item2;
    }
  }
};

const diff = function (obj1, obj2) {
  if (!obj2 || Object.prototype.toString.call(obj2) !== '[object Object]') {
    return obj1;
  }

  const diffs = {};
  let key;

  for (key in obj1) {
    if (obj1.hasOwnProperty(key)) {
      compare(obj1[key], obj2[key], key, diffs);
    }
  }

  for (key in obj2) {
    if (obj2.hasOwnProperty(key)) {
      if (!obj1[key] && obj1[key] !== obj2[key]) {
        diffs[key] = obj2[key];
      }
    }
  }

  return diffs;
};

export {diff, cloneObject}

export const stringify = (obj) => {
  let arr = [];
  Object.keys(obj).forEach(key => {
    arr.push(`${key}=${encodeURIComponent(obj[key])}`);
  });
  return arr.join('&');
};


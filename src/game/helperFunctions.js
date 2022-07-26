function createArray(length) {
  // 2D array factory function

  // eslint-disable-next-line one-var
  // eslint-disable-next-line prefer-const
  let arr = new Array(length || 0);
  let i = length;

  if (arguments.length > 1) {
    // eslint-disable-next-line prefer-rest-params
    const args = Array.prototype.slice.call(arguments, 1);
    // eslint-disable-next-line no-plusplus
    while (i--) arr[length - 1 - i] = createArray.apply(this, args);
  }

  return arr;
}

export default createArray;

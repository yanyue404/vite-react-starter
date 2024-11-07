/**
 * promise返回结果包装
 * @param {function} p 返回promise对象的function
 * @returns 一个永远成功返回一个数组的异步方法，数组的第一项存放错误信息，第二项存放结果
 */
export function promiseWrapper(p) {
  return (...args) => {
    return p(...args)
      .then((res) => [null, res])
      .catch((err) => [err, null]);
  };
}

export const throttle = (func, limit) => {
  let lastFunc;
  let lastRan;
  return function (...args) {
    if (!lastRan) {
      func.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if (Date.now() - lastRan >= limit) {
          func.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  };
};

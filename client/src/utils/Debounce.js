export const debounce = (func, wait) => {
  let timeout;

  return function (...args) {
    const callLater = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(callLater, wait);
  };
};

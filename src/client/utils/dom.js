const getVwInPx = num => {
  return document.documentElement.clientWidth * (num / 100);
};

const getVhInPx = num => {
  return document.documentElement.clientHeight * (num / 100);
};

export const getMinVInPx = num => {
  return Math.min(getVwInPx(num), getVhInPx(num));
};

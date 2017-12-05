export const randomPixelVal = (range) => {
  return Math.floor(Math.random() * range);
};

// TODO: Use priority queue instead of performing sorting
export const compareWhiteBloodCells = (a, b) => {
  if (a.fitness < b.fitness) { return 1; }
  if (a.fitness > b.fitness) { return -1; }
  return 0;
};

export const randMovement = () => {
  let n = Math.floor(Math.random() * 2);
  if (Math.random() > 0.50) {
    n *= -1;
  }
  return n;
};

export const determineObjType = (obj) => {
  if (obj.constructor.name === 'Bacteria') {
    return 1;
  }
  return 0;
};

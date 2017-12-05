export const matrixProduct = (weightMatrix, inputArray) => {
  const productArray = [];
  for (let i = 0; i < weightMatrix.length; i += 1) {
    let sum = 0;
    for (let j = 0; j < weightMatrix[i].length; j += 1) {
      sum += weightMatrix[i][j] * inputArray[j];
    }
    productArray.push(sum);
  }
  return productArray;
};

export const sigmoidActivation = (arr) => {
  return arr.map((num) => {
    return 1 / (1 + Math.exp(-1 * num));
  });
};

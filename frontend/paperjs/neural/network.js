import { matrixProduct, sigmoidActivation } from './helper';


class NeuralNetwork {
  constructor(weightMatrix1 = [], weightMatrix2 = []) {
    this.inputDim = 5;
    this.hiddenDim = 5;
    this.outputDim = 3;
    this.weightMatrix1 = weightMatrix1;
    this.weightMatrix2 = weightMatrix2;

    if (this.weightMatrix1.length === 0 && this.weightMatrix2.length === 0) {
      this.createWeightMatrices();
    }
  }

  calculateActivations(input) {
    const act1 = sigmoidActivation(matrixProduct(this.weightMatrix1, input));
    const act2 = sigmoidActivation(matrixProduct(this.weightMatrix2, act1));
    return act2;
  }

  getOutput(input) {
    const acts = this.calculateActivations(input);

    let idx;
    let predValue;
    for (let i = 0; i < acts.length; i += 1) {
      if (predValue === undefined || predValue < acts[i]) {
        predValue = acts[i];
        idx = i;
      }
    }

    return idx;
  }

  createWeightMatrices() {
    this.weightMatrix1 = [];
    for (let i = 0; i < this.hiddenDim; i += 1) {
      const subarray = [];
      for (let j = 0; j < this.inputDim; j += 1) {
        subarray.push((Math.random() - Math.random()) * 10);
      }
      this.weightMatrix1.push(subarray);
    }

    this.weightMatrix2 = [];
    for (let i = 0; i < this.outputDim; i += 1) {
      const subarray = [];
      for (let j = 0; j < this.hiddenDim; j += 1) {
        subarray.push((Math.random() - Math.random()) * 10);
      }
      this.weightMatrix2.push(subarray);
    }
  }
}

export default NeuralNetwork;

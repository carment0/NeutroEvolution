// Genetic algorithm imports
import WhiteBloodCell from './white_blood_cell';
import RedBloodCell from './red_blood_cell';
import Bacteria from './bacteria';
import NeuralNetwork from '../neural/network';

// Constants
import { COUNT } from './config';
import { randomPixelVal, compareWhiteBloodCells } from './helper';


class Population {
  constructor(height, width, mainGroup, latestMatrices) {
    this.frameHeight = height;
    this.frameWidth = width;
    this.mainGroup = mainGroup;
    this.latestMatrices = latestMatrices;

    this.createRedBloodCell(COUNT.rbc);
    this.createBacteria(COUNT.bacteria);
    this.createWhiteBloodCell(COUNT.wbc, latestMatrices);
  }

  createRedBloodCell(count) {
    this.redBloodCells = [];
    for (let i = 0; i < count; i += 1) {
      const xPosition = randomPixelVal(this.frameWidth);
      const yPosition = randomPixelVal(this.frameHeight);
      this.redBloodCells.push(new RedBloodCell(xPosition, yPosition, this.mainGroup));
    }
  }

  createWhiteBloodCell(count, latestMatrices) {
    this.whiteBloodCells = [];
    for (let i = 0; i < count; i += 1) {
      const xPosition = randomPixelVal(this.frameWidth);
      const yPosition = randomPixelVal(this.frameHeight);
      const neuralNet = new NeuralNetwork(latestMatrices[0], latestMatrices[1]);
      this.whiteBloodCells.push(new WhiteBloodCell(xPosition, yPosition, this.mainGroup, neuralNet));
    }
  }

  createBacteria(count) {
    this.bacteria = [];
    for (let i = 0; i < count; i += 1) {
      const xPosition = randomPixelVal(this.frameWidth);
      const yPosition = randomPixelVal(this.frameHeight);
      this.bacteria.push(new Bacteria(xPosition, yPosition, this.mainGroup));
    }
  }

  getAverageWhiteCellProperties() {
    let totalFitness = 0;
    let totalAge = 0;
    let totalEaten = 0;

    this.whiteBloodCells.forEach((whiteCell) => {
      totalFitness += whiteCell.fitness;
      totalAge += whiteCell.age;
      totalEaten += whiteCell.eaten;
    });

    const fitness = totalFitness / this.whiteBloodCells.length;
    const age = totalAge / this.whiteBloodCells.length;
    const eaten = totalEaten / this.whiteBloodCells.length;

    return { fitness, age, eaten };
  }

  fittestWhiteCell() {
    let bestWhiteCell;
    this.whiteBloodCells.forEach((whiteCell) => {
      if (bestWhiteCell === undefined || whiteCell.fitness > bestWhiteCell.fitness) {
        bestWhiteCell = whiteCell;
      }
    });

    return bestWhiteCell;
  }

  findClosestObj(whiteCell) {
    const currentPopulation = this.redBloodCells.concat(this.bacteria);
    let closestObject;
    let closestDistance;
    for (let i = 0; i < currentPopulation.length; i += 1) {
      const distance = whiteCell.point.getDistance(currentPopulation[i].point);
      if (closestDistance === undefined) {
        closestObject = currentPopulation[i];
        closestDistance = distance;
      } else if (distance < closestDistance) {
        closestObject = currentPopulation[i];
        closestDistance = distance;
      }
    }

    return closestObject;
  }

  updateFitnessByObjEaten(closestObject, cell) {
    const objectType = closestObject.constructor.name;
    const distance = cell.point.getDistance(closestObject.point);

    if ((distance - closestObject.radius) <= cell.radius) {
      switch (objectType) {
        case 'RedBloodCell':
          this.regenerateWhiteBloodCell(cell);
          break;
        case 'Bacteria':
          cell.fitness += 20;
          cell.eaten += 1;
          cell.whiteBloodCell.style.fillColor = 'white';
          this.deleteEaten(objectType, closestObject);
          break;
      }
    }
  }

  regenerateWhiteBloodCell(cell) {
    const sortedWhiteCells = this.whiteBloodCells.sort(compareWhiteBloodCells);
    const idx = this.whiteBloodCells.indexOf(cell);

    this.naturalSelection(sortedWhiteCells.slice(0, Math.floor(sortedWhiteCells.length / 4)), idx, this.mainGroup);
    cell.removeWhiteBloodCell();
  }

  deleteEaten(objectType, closestObject) {
    const xPosition = randomPixelVal(this.frameWidth);
    const yPosition = randomPixelVal(this.frameHeight);
    const idx = this.bacteria.indexOf(closestObject);
    this.bacteria[idx] = new Bacteria(xPosition, yPosition, this.mainGroup);
    closestObject.removeBacteria();
  }

  updateGeneration(mainGroup) {
    const sortedWhiteCells = this.whiteBloodCells.sort(compareWhiteBloodCells);

    this.whiteBloodCells.forEach((cell, idx) => {
      cell.age += 1;
      if (cell.age >= 4000) {
        if (Math.random() * 100 <= 0.8) {
          this.naturalSelection(sortedWhiteCells.slice(0, Math.floor(sortedWhiteCells.length / 4)), idx, mainGroup);
          cell.removeWhiteBloodCell();
        }
      } else if (cell.age >= 800 && cell.fitness <= 0) {
        if (Math.random() * 100 <= 0.8) {
          this.naturalSelection(sortedWhiteCells.slice(0, Math.floor(sortedWhiteCells.length / 4)), idx, mainGroup);
          cell.removeWhiteBloodCell();
        }
      }
    });
  }

  naturalSelection(parents, idx, mainGroup) {
    const matingPopulation = parents.length;
    const parentOneIdx = Math.floor(Math.random() * matingPopulation);
    const parentTwoIdx = Math.floor(Math.random() * matingPopulation);

    const neuralNetwork = parents[parentOneIdx].crossover(parents[parentTwoIdx]);

    const xPosition = randomPixelVal(this.frameWidth);
    const yPosition = randomPixelVal(this.frameHeight);
    this.whiteBloodCells[idx] = new WhiteBloodCell(xPosition, yPosition, mainGroup, neuralNetwork);
  }
}

export default Population;

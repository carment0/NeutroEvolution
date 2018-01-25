// Paper imports
import { Path, Point } from 'paper';

// Component imports
import NeuralNetwork from '../neural/network';

// Constants
import { COLORS, RADIUS, WBC } from './config';
import { determineObjType } from './helper';

function mutation(weights) {
  const updatedWeights = [];
  weights.forEach((weight) => {
    if (Math.random() < WBC.mutateRate / 100) {
      const determinePercentChange = (Math.random() - Math.random());
      const number = weight * 0.05;
      if (determinePercentChange < 0) {
        const randomWeight = weight - number;
        updatedWeights.push(randomWeight);
      } else {
        const randomWeight = weight + number;
        updatedWeights.push(randomWeight);
      }
    } else {
      updatedWeights.push(weight);
    }
  });
  return updatedWeights;
}

const MAX_SPEED = 100;


class WhiteBloodCell {
  /**
   * @param {Integer} x
   * @param {Integer} y
   * @param {Group} mainGroup
   * @param {NeuralNetwork} neuralNetwork
   */
  constructor(x, y, mainGroup, neuralNetwork = new NeuralNetwork()) {
    this.point = new Point(x, y);
    this.radius = RADIUS.wbc;
    this.whiteBloodCell = new Path.Circle(this.point, this.radius);
    this.fitness = 0;
    this.age = 0;
    this.neuralNetwork = neuralNetwork;
    this.velocity = new Point(Math.random(), Math.random());
    this.velocity = this.velocity.normalize(MAX_SPEED);
    this.eaten = 0;

    this.mainGroup = mainGroup;
    this.mainGroup.addChild(this.whiteBloodCell);

    this.whiteBloodCell.style = {
      fillColor: COLORS.Gray,
      strokeColor: COLORS.LightBlue,
      dashArray: [4, 10],
      strokeWidth: 7,
      strokeCap: 'round'
    };
  }

  /**
   * Implements change in position on canvas. The method translate moves the item by the given offset. The method add
   * adds one segment to the end of the segments array of this path. I am confused by this sentence already.
   */
  move() {
    this.whiteBloodCell.translate(this.velocity);
    this.point = this.point.add(this.velocity);
  }


  updateVelocity(closestObject) {
    const decision = this.getDecision(closestObject);
    switch (decision) {
      case 0:
        this.velocity = this.velocity.rotate(2);
        break;
      case 1:
        this.velocity = this.velocity.rotate(-2);
        break;
      case 2:
        console.log('not doing anything');
        break;
    }

    this.limitVelocity();
    this.checkBoundary();
  }

  getDecision(closestObject) {
    const type = determineObjType(closestObject);
    const targetDirec = closestObject.point.subtract(this.point).normalize();
    const thisDirec = this.velocity.normalize();

    // let crossProduct;
    // switch (type) {
    //   case 1:
    //     crossProduct = thisDirec.cross(targetDirec);
    //     if (crossProduct > 0) {
    //       return 0;
    //     } else if (crossProduct < 0) {
    //       return 1;
    //     }
    //
    //     if (thisDirec.isClose(targetDirec, 0.1)) {
    //       return 2;
    //     }
    //
    //     return 0;
    //   case 0:
    //     crossProduct = thisDirec.cross(targetDirec);
    //     if (crossProduct > 0) {
    //       return 1;
    //     } else if (crossProduct < 0) {
    //       return 0;
    //     }
    //
    //     return 2;
    // }

    const input = [targetDirec.x, targetDirec.y, thisDirec.x, thisDirec.y, type];
    return this.neuralNetwork.getOutput(input);
  }

  limitVelocity() {
    if (Math.abs(this.velocity.x) > WBC.maxVelocity) {
      if (this.velocity.x < 0) {
        this.velocity.x = -1 * WBC.maxVelocity;
      } else {
        this.velocity.x = WBC.maxVelocity;
      }
    }

    if (Math.abs(this.velocity.y) > WBC.maxVelocity) {
      if (this.velocity.y < 0) {
        this.velocity.y = -1 * WBC.maxVelocity;
      } else {
        this.velocity.y = WBC.maxVelocity;
      }
    }
  }

  checkBoundary() {
    const width = this.mainGroup.view.size.width;
    const height = this.mainGroup.view.size.height;

    if (this.point.x >= width || this.point.x < 0) {
      this.velocity.x *= -1;
    }

    if (this.point.y >= height || this.point.y < 0) {
      this.velocity.y *= -1;
    }
  }

  crossover(partner) {
    const matrix1 = this.neuralNetwork.weightMatrix1;
    const matrix2 = this.neuralNetwork.weightMatrix2;

    const splitIndex1 = Math.floor(Math.random() * matrix1.length);
    const splitIndex2 = Math.floor(Math.random() * matrix2.length);

    const newMatrix1 = [];
    const newMatrix2 = [];

    matrix1.forEach((el, idx) => {
      if (idx < splitIndex1) {
        newMatrix1.push(mutation(el));
      } else {
        newMatrix1.push(mutation(partner.neuralNetwork.weightMatrix1[idx]));
      }
    });

    matrix2.forEach((el, idx) => {
      if (idx < splitIndex2) {
        newMatrix2.push(mutation(el));
      } else {
        newMatrix2.push(mutation(partner.neuralNetwork.weightMatrix2[idx]));
      }
    });

    return new NeuralNetwork(newMatrix1, newMatrix2);
  }

  removeWhiteBloodCell() {
    this.whiteBloodCell.remove();
  }
}

export default WhiteBloodCell;

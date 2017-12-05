// Paper imports
import { Path, Point } from 'paper';

// Constants
import { COLORS, RADIUS } from './config';
import { randMovement } from './helper';


class RedBloodCell {
  constructor(x, y, mainGroup) {
    this.point = new Point(x, y);
    this.radius = RADIUS.rbc;
    this.redBloodCell = new Path.Circle(this.point, RADIUS.rbc);

    this.mainGroup = mainGroup;
    this.mainGroup.addChild(this.redBloodCell);

    this.redBloodCell.style = {
      fillColor: COLORS.DarkRed,
      strokeColor: COLORS.Red,
      strokeWidth: 8
    };
  }

  jiggle() {
    this.move(randMovement(), randMovement());
  }

  move(x, y) {
    this.redBloodCell.translate(new Point(x, y));
    this.point = this.point.add(new Point(x, y));
    this.checkBoundary();
  }

  checkBoundary() {
    const width = this.mainGroup.view.size.width;
    const height = this.mainGroup.view.size.height;

    if (this.point.x >= width || this.point.x < 0 || this.point.y >= height || this.point.y < 0) {
      const newX =  Math.floor(Math.random() * width);
      const newY =  Math.floor(Math.random() * height);
      this.point.x = newX;
      this.point.y = newY;
    }
  }

  removeRedCell() {
    this.redBloodCell.remove();
  }
}

export default RedBloodCell;

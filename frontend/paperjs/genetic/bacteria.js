// Paper imports
import { Path, Point } from 'paper';

// Constants
import { COLORS, RADIUS } from './config';
import { randMovement } from './helper';


class Bacteria {
  constructor(x, y, mainGroup) {
    this.point = new Point(x, y);
    this.radius = RADIUS.bacteria;
    this.bacteria = new Path.Circle(this.point, RADIUS.bacteria);
    this.position = new Point(0, 0);

    this.mainGroup = mainGroup;
    this.mainGroup.addChild(this.bacteria);

    this.bacteria.style = {
      fillColor: COLORS.Green,
      strokeColor: COLORS.Black,
    };
  }

  jiggle() {
    this.move(randMovement(), randMovement());
  }

  move(x, y) {
    this.bacteria.translate(new Point(x, y));
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

  removeBacteria() {
    this.bacteria.remove();
  }
}

export default Bacteria;

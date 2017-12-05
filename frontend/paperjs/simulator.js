// Paper imports
import { PaperScope, Group } from 'paper';

// Genetic algorithm imports
import Population from './genetic/population';


class Simulator {
  /**
   * @param {HTMLElement} canvasElement
   * @param {Array<Number>} latestMatrices
   */
  constructor(canvasElement, latestMatrices = []) {
    this.latestMatrices = latestMatrices;
    // When working with normal JavaScript code, PaperScope objects need to be manually created and handled.
    // Represents the scope associated with a Paper context.
    this.scope = new PaperScope();

    // Sets up an empty project for us. If a canvas is provided, it also creates a View for it, both linked to this scope.
    this.scope.setup(canvasElement);

    // Extract vital variables from Paper scope
    this.project = this.scope.project;
    this.view = this.scope.view;
    this.height = this.scope.view.size.height;
    this.width = this.scope.view.size.width;

    this.mainGroup = new Group();

    // The currently active project. Activates this project, so all newly created items will be placed in it.
    this.project.activeLayer.addChild(this.mainGroup);
    this.project.activate();
  }

  run() {
    this.population = new Population(this.height, this.width, this.mainGroup, this.latestMatrices);

    this.view.onFrame = () => {
      this.population.bacteria.forEach((bacteria) => {
        bacteria.jiggle(this.width);
      });

      this.population.redBloodCells.forEach((cell) => {
        cell.jiggle(this.width);
      });

      this.population.updateGeneration(this.mainGroup);

      this.population.whiteBloodCells.forEach((cell) => {
        const closestObject = this.population.findClosestObj(cell);
        cell.updateVelocity(closestObject);
        cell.move();
        this.population.updateFitnessByObjEaten(closestObject, cell);
      });
    };
  }
}

export default Simulator;

// External library
import React from 'react';
import Paper from 'material-ui/Paper';

const About = () => (
  <Paper className="about">
    <section className="banner">
      <p>
        This project implement two bio-inspired computing methods to create a white blood cell (WBC) artificial
        intelligence. Each generation of WBC evolve to optimize their ability to track and engulf bacteria within a red
        blood cell colonized environment. Here, we will discuss how genetic algorithm is used to evolve and optimize a
        feedforward neural network.
      </p>
    </section>
    <section className="intro">
      <h1 className="title">The White Knights</h1>
      <p>
        Before we get into the nitty-gritty details of how this project was implemented, lets learn about our immune
        system and the importance of white blood cells!
      </p>
      <div className="videos">
        <iframe
          title="The Immune System Explained"
          width="850"
          height="485"
          src="https://www.youtube.com/embed/zQGOcOUBi6s"
          frameBorder="0"
          gesture="media"
          allowFullScreen />
        <br />
        <br />
        <iframe
          title="How White Blood Cells Work"
          width="854"
          height="480"
          src="https://www.youtube.com/embed/0TvTyj5FAaQ"
          frameBorder="0"
          gesture="media"
          allowFullScreen />
      </div>
    </section>
    <section className="main-content">
      <h1 className="title">Using Genetic Algorithms to Evolve Artificial Neural Networks</h1>
      <strong className="subheader">The Basics</strong>
      <p className="topics">What is Genetic Algorithm?</p>
      <p>
        A search based algorithmic process influenced by biological principles of natural selection. It is frequently
        used to find optimal or near-optimal solutions to highly nonlinear problems in a short amount of time.
      </p>
      <p>
        The genetic algorithm can be applied in different way depending on the operators used implement
        <a href="https://www.tutorialspoint.com/genetic_algorithms/genetic_algorithms_crossover.htm">crossover</a> or
        <a href="https://www.tutorialspoint.com/genetic_algorithms/genetic_algorithms_mutation.htm">mutations</a>.
        However, all genetic algorithm follow the same convention:
      </p>
      <img src="/images/ga_flowchart.jpg" alt="float chart" />
      <p className="credits">
        Genetic algorithm flow chart -
        <a href="https://www.tutorialspoint.com/genetic_algorithms/genetic_algorithms_fundamentals.htm">
          tutorialspoint
        </a>
      </p>
      <br />

      <p className="topics">What is Natural Selection?</p>
      <p>
        A process of adaptation of an organism to their environment. Organisms that are best suited to the environment
        will survive and a reproduce successfully, producing well adapted descendants.
      </p>
      <br />

      <p className="topics">Similarities in neural network and neurons</p>
      <ul>
        <li>Selection: The survival of the fittest</li>
        <li>Crossover: Genetic exchange between two parents</li>
        <li>Mutation: Introducing random modification within a population</li>
      </ul>
      <br />

      <p className="topics">What is Artificial Neural Network?</p>
      <p>
        A computational model influenced by the behavior of the central nervous system. It is a network of highly
        interconnected artificial neurons that acquires knowledge through configuring inter-neuron connection strength
        (weight matrices) to perform a specific task. It is used to derive meaning from complicated or imprecise data,
        detect trends and perform adaptive learning.
      </p>
      <img src="/images/ann_model.jpg" alt="artificial neural network model" />
      <p className="credits">
        Artificial neuron model -
        <a href="https://hackernoon.com/overview-of-artificial-neural-networks-and-its-applications-2525c1addff7">
          hackernoon
        </a>
      </p>
      <br />

      <p className="topics">What are Biological Neurons?</p>
      <p>
        Neurons are the building blocks of the brain. They are highly excitable cells that receive, process, and transit
        information.
      </p>
      <img src="/images/neuron.jpg" alt="neuron" />
      <p className="credits">Structure of a neuron -
        <a href="https://www.xenonstack.com/blog/overview-of-artificial-neural-networks-and-its-applications">
          xenonstack
        </a>
      </p>
      <ul>
        <li>Dendrite: Receives signals</li>
        <li>Soma (Cell Body): Sum signals and generate input</li>
        <li>Axon: Fire signals when sum threshold value is reached</li>
        <li>Synapses: Transmit signals dependent on synaptic weights</li>
      </ul>
      <br />
      <p className="topics">
        Similarities in neural network and neurons
      </p>
      <ul>
        <li>Neuroplasticity</li>
        <li>Acquire knowledge through learning</li>
        <li>Changes within inter-neuron connection strengths</li>
      </ul>
      <br />
      <strong className="subheader">The Anatomy</strong>
      <p className="topics">
        How does the neural networks work in this project?
      </p>
      <p>I created a deep feedforward neural networks by using a multilayer perceptron neural network architecture.</p>
      <img src="/images/ann_structure.jpg" alt="structure" />
      <p className="credits">
        An example of a multilayer perceptron neural network structure -
        <a href="https://hackernoon.com/overview-of-artificial-neural-networks-and-its-applications-2525c1addff7">
          hackernoon
        </a>
      </p>
      <p>Input layer</p>
      <ul>
        <li>Contains neurons that receives normalized inputs of the WBC from the external world
          <ul>
            <li>Inputs include: x and y vector, x and y velocity and closest object type (0 or 1)</li>
          </ul>
        </li>
      </ul>
      <p>Hidden layer 1</p>
      <ul>
        <li>5 neurons</li>
        <li>External inputs are weighted and summed
          <ul>
            <li>
              Each input is multiplied by its corresponding weights which represents the strength of the interconnection
              between the neurons
            </li>
            <li>The weighted inputs are all summed</li>
          </ul>
        </li>
        <li>
          Each weighted sum is pass to a sigmoidal function to calculate the activation
          <ul>
            <li>The sigmoidal function limits the summed value from 0 to 1 to get a desired result</li>
          </ul>
        </li>
      </ul>

      <p>Hidden layer 2</p>
      <ul>
        <li>3 neurons</li>
        <li>The activation values from the first hidden layer is weighted and summed as the input</li>
        <li>Each weighted sum is pass to a sigmoidal function to calculate the activation</li>
      </ul>
      <img src="/images/equation.png"  alt="equation" />
      <p className="credits">
        Equations used to calculate activation -
        <a href="https://hackernoon.com/everything-you-need-to-know-about-neural-networks-8988c3ee4491">
          hackernoon
        </a>
      </p>

      <p>Output layer</p>
      <ul>
        <li>Returns three numeric values to determine the movement of the WBC</li>
      </ul>
      <br />

      <p className="topics">How is genetic algorithm applied to neural networks in this project?</p>
      <p>A random population of WBC are created.</p>
      <p>Each WBC updated their fitness at each frame.</p>
      <p>Selection</p>
      <ul>
        <li>
          Individuals with a higher fitness has a greater probability to pass their genetic material (weighted matrices
          of their neural networks) to the next generation
          <ul>
            <li>Fitness is calculated by their ability to distinguish and eat a bacteria</li>
          </ul>
        </li>
        <li>Their leverage is due to fitness proportionate selection</li>
        <li>
          Since the WBC lifespan is depend on the fitness, individuals with a higher fitness has a greater opportunity
          to reproduce
        </li>
      </ul>

      <img src="/images/roulette_wheel_selection.jpg" alt="wheel selection" />
      <p className="credits">An example of a roulette wheel for a proportionate selection based on fitness -
        <a href="https://www.tutorialspoint.com/genetic_algorithms/genetic_algorithms_parent_selection.htm">
          tutorialspoint
        </a>
      </p>

      <p>Crossover</p>
      <ul>
        <li>When two WBC are selected to become parents of a new WBC, they need to cross over their weighted matrices
          <ul>
            <li>A weighted matrix is a multidimensional array</li>
          </ul>
        </li>
        <li>Since a WBC has two weighted matrix, crossover occurs twice </li>
        <li>The crossover location is determined by a random index location at the first level array
          <ul>
            <li>The nested arrays are then exchanged at the chosen location to form new matrices for the offspring</li>
          </ul></li>
      </ul>
      <img src="/images/crossover.jpg" alt="crossover" />
      <p className="credits">An example of a single point crossover -
        <a href="https://www.tutorialspoint.com/genetic_algorithms/genetic_algorithms_crossover.htm">
          tutorialspoint
        </a>
      </p>

      <p>Mutation</p>
      <ul>
        <li>
          Before completing each crossover, individual values from the nest array have a 1% probability of genetic
          change
          <ul>
            <li>Induces randomness within a population</li>
            <li>If mutation occurs, the value in question will randomly change its a value from -10 to 10</li>
          </ul>
        </li>
      </ul>
      <img src="/images/mutation.jpg" alt="mutation" />
      <p className="credits">An example of a random mutation -
        <a href="https://www.tutorialspoint.com/genetic_algorithms/genetic_algorithms_mutation.htm">
          tutorialspoint
        </a>
      </p>
    </section>
  </Paper>
);

export default About;

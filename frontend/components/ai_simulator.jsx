// External libraries
import React from 'react';
import axios from 'axios';
import Snackbar from 'material-ui/Snackbar';

// Components
// import DataTable from './data_table';

// Paper.js
// import Simulator from '../paper/simulator';

class AISimulator extends React.Component {
  state = {
    population: null,
    fittestWhiteBloodCell: {},
    avgStats: [],
    openSnack: false,
    reportMessage: ''
  };

  componentWillMount() {
    axios.get('/api/weights/latest')
      .then(this.handleWeightsGetSuccess)
      .catch(this.handleWeightsGetFail);
  }

  componentDidMount() {
    this.updateState = setInterval(this.handleState, 2000);
    this.saveWeightsInterval = setInterval(this.handleWeightsCreate, 20000);
  }

  componentWillUnmount() {
    clearInterval(this.updateState);
    clearInterval(this.saveWeightsInterval);
  }

  handleState = () => {
    this.setState({
      population: this.simulation.population,
      fittestWhiteBloodCell: this.simulation.population.fittestWhiteCell(),
    });

    const stats = this.simulation.population.getAverageWhiteCellProperties();

    if (this.state.avgStats.length === 0) {
      this.setState({ avgStats: [stats] });
    } else if (this.state.avgStats.length <= 12) {
      const newArray1 = this.state.avgStats;
      newArray1.unshift(stats);
      this.setState({ avgStats: newArray1 });
    } else {
      this.state.avgStats.pop();
      const newArray2 = this.state.avgStats;
      newArray2.unshift(stats);
      this.setState({ avgStats: newArray2 });
    }
  }

  handleWeightsCreate = () => {
    if (this.state.fittestWhiteBloodCell) {
      const weight1 = this.state.fittestWhiteBloodCell.neuralNetwork.weightMatrix1;
      const weight2 = this.state.fittestWhiteBloodCell.neuralNetwork.weightMatrix2;

      axios.post('/api/weights', { weight1: weight1, weight2: weight2 })
        .then(this.handleWeightsCreateSuccess)
        .catch(this.handleWeightsCreateFail);
    }
  };

  handleWeightsCreateFail = () => {
    this.setState({ openSnack: true, reportMessage: 'Unexpected error occurred; failed to save weights to server.' });
    setTimeout(() => { this.setState({ openSnack: false }); }, 3000);
  }

  handleWeightsCreateSuccess = () => {
    this.setState({ openSnack: true, reportMessage: 'Your recent neurons having been saved to the server!' });
    setTimeout(() => { this.setState({ openSnack: false }); }, 3000);
  }

  handleWeightsGetFail = () => {
    this.setState({ openSnack: true, reportMessage: 'Failed to retrieve weights from server.' });
    setTimeout(() => { this.setState({ openSnack: false }); }, 3000);
  }

  handleWeightsGetSuccess = (res) => {
    this.setState({
      openSnack: true,
      reportMessage: 'Weights have been retrieved from server'
    });

    setTimeout(() => {
      this.setState({ openSnack: false, reportMessage: '' });
    }, 3000);

    this.weight1 = res.data.weight1;
    this.weight2 = res.data.weight2;
    // this.simulation = new Simulator(this.canvas, [this.weight1, this.weight2]);
    // this.simulation.run();
  }

  /**
  * Callback to update the canvas size and store it as an instance variable to this component because Paper.js will need
  * it for instantiating a Paper scope.
  * @param {HTMLElement} canvas
  */
  configureCanvas = (canvas) => {
    if (canvas) {
      this.canvas = canvas;
      this.canvas.height = document.getElementById('left-panel').offsetHeight * 0.95;
      this.canvas.style.background = '#ffe6f2';
      console.log(this.canvas.width);
      console.log(this.canvas.height);
    }
  }

  render() {
    return (
      <div className="ai-simulator">
        <div className="content">
          <div className="left-panel" id="left-panel">
            <canvas ref={this.configureCanvas} />
          </div>
          <div className="right-panel" />
        </div>
        <Snackbar
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          open={this.state.openSnack}
          autoHideDuration={3000}
          message={<span id="message-id">{this.state.reportMessage}</span>} />
      </div>
    );
  }
}

export default AISimulator;

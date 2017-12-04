// External libraries
import React from 'react';
import ReactDOM from 'react-dom';
import Paper from 'material-ui/Paper';
import Tabs, { Tab } from 'material-ui/Tabs';

// Components
import AISimulator from './components/ai_simulator';
import About from './components/about';

import './scss/application.scss';

class Application extends React.Component {
  state = {
    tabValue: 0,
  };

  handleChange = (event, tabValue) => {
    this.setState({ tabValue });
  };

  get content() {
    if (this.state.tabValue === 1) {
      return <About />;
    }

    return (
      <AISimulator />
    );
  }

  render() {
    return (
      <div id="application">
        <Paper className="navigation">
          <Tabs
            value={this.state.tabValue}
            centered="true"
            indicatorColor="primary"
            textColor="primary"
            onChange={this.handleChange}>
            <Tab label="AI Simulation" />
            <Tab label="About" />
          </Tabs>
        </Paper>
        {this.content}
      </div>
    );
  }
}

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(<Application />, document.getElementById('react-application'));
});

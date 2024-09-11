import React, { Component } from 'react';
import DataStreamer, { ServerRespond } from './DataStreamer';
import Graph from './Graph';
import './App.css';

interface IState {
  data: ServerRespond[],
  showGraph: boolean,
}

class App extends Component<{}, IState> {
  private intervalId: NodeJS.Timeout | null = null;

  constructor(props: {}) {
    super(props);
    this.state = {
      data: [],
      showGraph: false,
    };
  }

  componentWillUnmount() {
    // Clean up the interval when the component unmounts
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  renderGraph() {
    if (this.state.showGraph) {
      return <Graph data={this.state.data} />;
    }
  }

  async getDataFromServer() {
    let x = 0;
    this.intervalId = setInterval(async () => {
      try {
        DataStreamer.getData((serverResponds: ServerRespond[]) => {
          this.setState({
            data: serverResponds,
            showGraph: true,
          });
        });
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error appropriately (e.g., show an error message)
      }
      x++;
      if (x > 1000) {
        clearInterval(this.intervalId!);
      }
    }, 100);
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          Bank Merge & Co Task 3
        </header>
        <div className="App-content">
          <button className="btn btn-primary Stream-button" onClick={() => this.getDataFromServer()}>
            Start Streaming Data
          </button>
          <div className="Graph">
            {this.renderGraph()}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

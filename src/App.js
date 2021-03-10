import { Component } from 'react';
import './App.css';
import RideContainer from './Components/RideContainer';

const ridesURL = "http://localhost:3000/rides"

class App extends Component {

  state = {
    rides: []
  }

  componentDidMount(){
    fetch(ridesURL)
      .then(response => response.json())
      .then(response => {
        this.setState({
          rides: response
        })
      })
  }

  render(){
    return (
      <div className="App">
        <RideContainer rides={this.state.rides}/>
      </div>
    );
  }
}

export default App;

import { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import RideContainer from './Components/RideContainer';
import RideForm from './Components/RideForm';

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

  addRide = (newRide) => {
    this.setState({
      rides: [...this.state.rides, newRide]
    })

    fetch(ridesURL, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({ride: {...newRide}})
    })
  }

  deleteRide = (id) => {
    let filtered = this.state.rides.filter(ride => ride.id !== id)
    this.setState({
      rides: filtered
    })

    fetch(`${ridesURL}/${id}`, {
      method: "DELETE",
    })
  }

  updateRide = (updatedRide) => {
    let rides = this.state.rides.map(ride => ride.id === updatedRide.id ? updatedRide : ride)
    this.setState({rides})
  }

  

  render(){
    return (
      <div className="App">
        <Header />
        <RideForm submitAction={this.addRide}/>
        <RideContainer rides={this.state.rides} deleteRide={this.deleteRide} updateRide={this.updateRide}/>
      </div>
    );
  }
}

export default App;

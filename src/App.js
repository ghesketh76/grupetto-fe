import { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import RideContainer from './Components/RideContainer';
import RideForm from './Components/RideForm';
import SignUpForm from './Components/SignUpForm';
import {Route, Switch, Redirect, Link} from 'react-router-dom'
import Home from './Components/Home'
import PrivateRoute from './Components/PrivateRoute'
const ridesURL = "http://localhost:3000/rides"
const userURL = "http://localhost:3000/users"

class App extends Component {

  state = {
    rides: [],
    user: {},
    alerts: []
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

  signUp = (user) => {
    return fetch(userURL, {
      method: "POST",
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({user})
    })
      .then(response => response.json())
      .then(response => {
        if(response.errors){
          this.setState({alerts: response.errors})
        } else {
          localStorage.setItem('token', response.token)
          this.setState({
            user: response.user,
            alerts: ["User Succusfully Created!"],

          })
        }
      })
  }

  

  render(){
    return (
      <div className="App">
        <Header />
        <Switch>
          <PrivateRoute 
            exact
            path="/"
            component={Home}
            submitAction={this.addRide}
            rides={this.state.rides}
            user={this.state.user}
            deleteRide={this.deleteRide}
            updateRide={this.updateRide}
          />
          <Route exact path='/signup' render={(routerProps) => {
            return <SignUpForm {...routerProps} signUp={this.signUp} alerts={this.state.alerts}/>
          }}/>
          <Redirect to="/"/>
        </Switch>
        
      </div>
    );
  }
}

export default App;

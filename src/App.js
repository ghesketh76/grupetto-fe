import { Component } from 'react';
import './App.css';
import Header from './Components/Header';
import SignUpForm from './Components/SignUpForm';
import {Route, Switch, Redirect} from 'react-router-dom'
import Home from './Components/Home'
import PrivateRoute from './Components/PrivateRoute'
import Login from './Components/Login'

const ridesURL = "http://localhost:3000/rides"
const userURL = "http://localhost:3000/users"
const loginURL = "http://localhost:3000/login"

class App extends Component {

  state = {
    rides: [],
    user: {},
    alerts: []
  }

  componentDidMount(){
    fetch(ridesURL, {
      method: 'GET',
      headers: {
        "Authorization": `Bearer ${localStorage.token}`
      }
    })
      .then(response => response.json())
      .then(response => {
        this.setState({
          rides: response
        })
      })
  }

  addRide = (newRide) => {
    this.setState({
      rides: [...this.state.rides, {
        name: newRide.name, 
        ride_type: newRide.ride_type, 
        meeting_location: newRide.meeting_location,
        meeting_location_lat: newRide.meeting_location_lat,
        meeting_location_long: newRide.meeting_location_long,
        start_time: newRide.start_time,
        day_half: newRide.day_half,
        day_of_week: newRide.day_of_week,
        user_id: this.state.user.id
                                    
      }]
    })
    
    fetch(ridesURL, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${localStorage.token}`
      },
      body: JSON.stringify({ride: {
                                    name: newRide.name, 
                                    ride_type: newRide.ride_type, 
                                    meeting_location: newRide.meeting_location,
                                    meeting_location_lat: newRide.meeting_location_lat,
                                    meeting_location_long: newRide.meeting_location_long,
                                    start_time: newRide.start_time,
                                    day_half: newRide.day_half,
                                    day_of_week: newRide.day_of_week,
                                    user_id: this.state.user.id
                                  }})
    })
  }

  deleteRide = (id) => {
    let filtered = this.state.rides.filter(ride => ride.id !== id)
    this.setState({
      rides: filtered
    })

    fetch(`${ridesURL}/${id}`, {
      method: "DELETE",
      headers: {
        'Authorization': `Bearer ${localStorage.token}`
      }
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

  login = ({username, password}) => {
    return fetch(loginURL, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify({username, password})
    })
      .then(response => response.json())
      .then(response => {
        if(response.errors){
          this.setState({alerts: response.errors})
        } else {
          localStorage.setItem('token', response.token)
          this.setState({
            user:response.user,
            alerts: ["Succesful Login!"]
          })
        }
      })
  }

  

  render(){
    return (
      <div className="App">
        <Header user={this.state.user}/>
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
          <Route exact path='/login' render={(routerProps) => {
            return <Login {...routerProps} login={this.login} alerts={this.state.alerts}/>
          }}/>
          <Redirect to="/"/>
        </Switch>
        
      </div>
    );
  }
}

export default App;

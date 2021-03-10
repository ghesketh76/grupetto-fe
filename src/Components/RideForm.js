import React, { Component } from 'react'

const initialState = {
    id: "",
    name: "",
    ride_type: "",
    meeting_location: "",
    start_time: "",
    day_half: "",
    day_of_week: ""
}

export default class RideForm extends Component {

    state = initialState

    componentDidMount(){
        const {ride} = this.props
        if(this.props.ride){
            const {id, name, ride_type, meeting_location, start_time, day_half, day_of_week} = ride
            this.setState({
                id,
                name,
                ride_type,
                meeting_location,
                start_time,
                day_half,
                day_of_week
            })
        }
    }

   handleChange = (event) => {
       let {name, value} = event.target
       this.setState({
           [name]: value
       })
   }

   handleSubmit = (event) => {
       event.preventDefault()
       this.props.submitAction(this.state)
   }

   showCloseButton = () => {
       return this.props.ride
                ? <button className="close-button" onClick={this.props.handleToggle}>Close Form</button>
                : null
    }

    render() {
        const {name, ride_type, meeting_location, start_time, day_half, day_of_week} = this.state
        return (
            <form className="ride-form" onSubmit={this.handleSubmit}>
                <h2>Create a New Group Ride</h2>
                <label>Ride Name</label>
                <input 
                    type="text"
                    name="name" 
                    value={name}
                    onChange={this.handleChange}  
                />
                <label>Ride Type</label>
                <input 
                    type="text"
                    name="ride_type"   
                    value={ride_type}
                    onChange={this.handleChange} 
                />
                <label>Meeting Location</label>
                <input 
                    type="text"
                    name="meeting_location"   
                    value={meeting_location}
                    onChange={this.handleChange} 
                />
                <label>Start Time</label>
                <input 
                    type="text"
                    name="start_time"    
                    value={start_time}
                    onChange={this.handleChange} 
                />
                <select name="day_half" onChange={this.handleChange} value={day_half}>
                    <option value="null"></option>
                    <option value="AM">AM</option>
                    <option value="PM">PM</option>
                </select>   
                <label>Day of Week</label>
                <select name="day_of_week" onChange={this.handleChange} value={day_of_week}>
                    <option value="null"></option>
                    <option value="Monday">Monday</option>
                    <option value="Tuesday">Tuesday</option>
                    <option value="Wednesday">Wednesday</option>
                    <option value="Thursday">Thursday</option>
                    <option value="Friday">Friday</option>
                    <option value="Saturday">Saturday</option>
                    <option value="Sunday">Sunday</option>
                </select>
                <input type="submit" />
                {this.showCloseButton()}
            </form>
        )
    }
}

import React from 'react'

export default function RideItem({name, ride_type, meeting_location, start_time, day_half, day_of_week}) {

    const rideCard = () => (
        <li className="ride-item">
            <h2>{name}</h2>
            <h3>Ride Type: {ride_type}</h3>
            <p>Meeting Location: {meeting_location}</p>
            <p>Takes place every: {day_of_week}</p>
            <p>Start Time: {start_time} {day_half}</p>
        </li>
    )
    return (
        rideCard()        
    )
}

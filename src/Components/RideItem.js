import RideForm from './RideForm'
import React, {useState} from 'react'

export default function RideItem({
                                    id, 
                                    name, 
                                    ride_type, 
                                    meeting_location, 
                                    start_time, 
                                    day_half, 
                                    day_of_week, 
                                    deleteRide,
                                    updateRide,
                                    user,
                                    user_id,
                                    joinRide,
                                    joinRides
            }) {

    const [isToggled, setIsToggled] = useState(false)
    const [joinRideCount, setJoinRideCount] = useState("")

    const ride = {id, name, ride_type, meeting_location, start_time, day_half, day_of_week}
    
    const handleClick = (event) => deleteRide(id)
    const handleToggle = (event) => setIsToggled(!isToggled)

   const handleJoinRide = () => joinRide({ride: id, user: user.id})
        
    const countJoinRides = () => {
        let joinRideArray = joinRides.filter(joined => joined.ride_id === id)
        return joinRideArray.length
    }

    const rideCard = () => (
        <li className="ride-item">
            <h2>{name}</h2>
            <h3>Ride Type: {ride_type}</h3>
            <p>Meeting Location: {meeting_location}</p>
            <p>Takes place every: {day_of_week}</p>
            <p>Start Time: {start_time} {day_half}</p>
            <p>Attendees: {countJoinRides()}</p>
            <button onClick={handleJoinRide} className="join-button">JOIN RIDE</button>
            {user.id === user_id
                ? (
                <>
                   <button className="edit-button" onClick={handleToggle}>EDIT</button>
                   <button className="delete-button" onClick={handleClick}>DELETE</button>
                </>
                )
                : null
            }

            

        </li>
    )
    return isToggled
        ? <RideForm 
            ride={ride}
            handleToggle={handleToggle}
            submitAction={updateRide}
          />
        : rideCard()        
    
}

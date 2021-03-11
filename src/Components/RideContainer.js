import React from 'react'
import RideItem from './RideItem'


export default function RideContainer({rides, deleteRide, updateRide, user}) {

    const showRides = () => {
        return rides.map(ride => <RideItem user={user} key={ride.id} {...ride} deleteRide={deleteRide} updateRide={updateRide}/>)
    }
    return (
        <ul className="ride-list">
            {showRides()}
        </ul>
    )
}

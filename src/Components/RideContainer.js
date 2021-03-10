import React from 'react'
import RideItem from './RideItem'


export default function RideContainer({rides, deleteRide, updateRide}) {

    const showRides = () => {
        return rides.map(ride => <RideItem key={ride.id} {...ride} deleteRide={deleteRide} updateRide={updateRide}/>)
    }
    return (
        <ul className="ride-list">
            {showRides()}
        </ul>
    )
}

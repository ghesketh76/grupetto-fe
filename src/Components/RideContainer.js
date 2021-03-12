import React from 'react'
import RideItem from './RideItem'


export default function RideContainer({rides, deleteRide, updateRide, user, joinRide}) {

    const showRides = () => {
        return rides.map(ride => <RideItem 
                                    user={user} 
                                    key={ride.id} 
                                    {...ride} 
                                    deleteRide={deleteRide} 
                                    updateRide={updateRide} 
                                    joinRide={joinRide}
                                />)
    }
    return (
        <ul className="ride-list">
            {showRides()}
        </ul>
    )
}

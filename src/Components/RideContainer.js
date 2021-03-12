import React from 'react'
import RideItem from './RideItem'


export default function RideContainer({rides, deleteRide, updateRide, user, joinRide, joinRides}) {

    const showRides = () => {
        return rides.map(ride => <RideItem 
                                    user={user} 
                                    key={ride.id} 
                                    {...ride} 
                                    deleteRide={deleteRide} 
                                    updateRide={updateRide} 
                                    joinRide={joinRide}
                                    joinRides={joinRides}
                                />)
    }
    return (
        <ul className="ride-list">
            {showRides()}
        </ul>
    )
}

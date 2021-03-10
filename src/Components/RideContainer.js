import React from 'react'
import RideItem from './RideItem'


export default function RideContainer({rides}) {

    const showRides = () => {
        return rides.map(ride => <RideItem {...ride}/>)
    }
    return (
        <ul className="ride-list">
            {showRides()}
        </ul>
    )
}

import React, { useState } from 'react'
import RideContainer from './RideContainer';
import RideForm from './RideForm';

export default function Home(props) {

    const [formToggle, setFormToggle] = useState('false')


    const handleFormToggle = () => {
        setFormToggle(!formToggle)
    }
    return (
        <>
            {formToggle
            ? <button className="form-toggle" onClick={handleFormToggle}>Post a New Ride!</button>
            : <RideForm submitAction={props.submitAction} formToggle={formToggle} handleFormToggle={handleFormToggle}/>
            }
            
            
            <RideContainer user={props.user} rides={props.rides} deleteRide={props.deleteRide} updateRide={props.updateRide}/>
        </>
    )
}

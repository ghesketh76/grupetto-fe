import React from 'react'
import RideContainer from './RideContainer';
import RideForm from './RideForm';

export default function Home(props) {
    return (
        <>
            <RideForm submitAction={props.submitAction}/>
            <RideContainer rides={props.rides} deleteRide={props.deleteRide} updateRide={props.updateRide}/>
        </>
    )
}

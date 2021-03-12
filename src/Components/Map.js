import React, { Component } from 'react' 
import GoogleMapReact from 'google-map-react'
import { Icon } from '@iconify/react'
import locationIcon from '@iconify/icons-mdi/map-marker'

const LocationPin = ({ text }) => (
    <div className="pin">
      <Icon icon={locationIcon} className="pin-icon" />
      <p className="pin-text">{text}</p>
    </div>
  )

class SimpleMap extends Component {
    static defaultProps = {
      center: {
        lat: 39.748229,
        lng: -104.992903
      },
      zoom: 11
    };
   
    render() {
      return (
        <div className="map-section" style={{ height: '75vh', width: '100%' }}>
          <GoogleMapReact
            bootstrapURLKeys={{ key: {/* GOOGLE API KEY */}}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
          >
            {this.props.rides.map(ride => (
                <LocationPin 
                    lat={ride.meeting_location_lat}
                    lng={ride.meeting_location_long}
                    text={ride.name}
                    key={ride.id}
                />
            ))
            }


            {/* <AnyReactComponent
              lat={59.955413}
              lng={30.337844}
              text="My Marker"
            /> */}
          </GoogleMapReact>
        </div>
      );
    }
  }
   
  export default SimpleMap;

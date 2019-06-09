import {Map, InfoWindow, Marker, GoogleApiWrapper} from 'google-maps-react';
import React, {Component} from 'react'

export class MapContainer extends React.Component {
    render() {
        return (
            <Map style={{width: "100vw", heigth: "100vh"}} google={this.props.google} zoom={14}>

                <Marker onClick={this.onMarkerClick}
                        name={'Current location'} />

                <InfoWindow onClose={this.onInfoWindowClose}>

                </InfoWindow>
            </Map>
        );
    }
}

export default GoogleApiWrapper({
    apiKey: ("AIzaSyB0tZ44Fibv82kfMQROT0qAH9iZAB2d2iM")
})(MapContainer)
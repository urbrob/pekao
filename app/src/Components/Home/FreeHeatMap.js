import React from 'react';
import Map, { GoogleApiWrapper } from 'google-maps-react';

export class FreeMap extends React.Component {
    render() {
        return (
            <Map
                google={this.props.google}
                zoom={14}
                center={{
                    lat: 37.774929,
                    lng: -122.419416,
                }}
            />
        );
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyAglZr6-asq6ROsX8eXyEy7ElXlNgj1I1Q",
})(FreeMap);
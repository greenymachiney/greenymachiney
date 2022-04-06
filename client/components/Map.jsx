import React from 'react';
import GoogleMapReact from 'google-map-react';

const location = {
  address: '1600 Amphitheatre Parkway, Mountain View, california.',
  lat: 29,
  lng: -90,
};

const zoomLevel = 4;

function Map() {
  return (
    <div className="map">
      <h2 className="map-h2">Come Visit Us At Our Campus</h2>

      <div className="google-map">
        <GoogleMapReact
          bootstrapURLKeys={{ key: 'AIzaSyBr7t_kZMkAIIUXDyHkB002uPLl95nS3cc' }}
          defaultCenter={location}
          defaultZoom={zoomLevel}
        >
          <LocationPin
            lat={location.lat}
            lng={location.lng}
            text={location.address}
          />
        </GoogleMapReact>
      </div>
    </div>
  );
}

export default Map;

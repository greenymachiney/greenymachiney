import React, {useRef, useEffect} from 'react';
// the google maps wrapper lets my use a google map inside a component
import { Wrapper, Status } from '@googlemaps/react-wrapper';
import GoogleMapReact from 'google-map-react';
import Map from './Map.jsx';
import LocationPin from './LocationPin.jsx';

// require('dotenv').config();

function MyMapComponent(_a) {
    var center = _a.center, zoom = _a.zoom;
    var ref = useRef();
    useEffect(function () {
        new window.google.maps.Map(ref.current, {
            center: center,
            zoom: zoom,
        });
    });
    return <div ref={ref} id="map" />;
}

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById('map'), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 8,
  });
}

function CreateStaticEvent(props) {
  return (
    // <div>Hello World</div>
    <Wrapper
      apiKey=
        // perform get request to server to get api key?
        "AIzaSyBr7t_kZMkAIIUXDyHkB002uPLl95nS3cc"

    >
      <MyMapComponent />
    </Wrapper>
  );
}

export default CreateStaticEvent;

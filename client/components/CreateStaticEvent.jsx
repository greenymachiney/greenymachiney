import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

import Marker from './Marker.jsx';
import Map from './Map.jsx';
// the google maps wrapper lets my use a google map inside a component
import { Wrapper } from '@googlemaps/react-wrapper';
import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';

import GoogleMapReact from 'google-map-react';
import { GoogleMap, useLoadScript, InfoWindow } from '@react-google-maps/api';

const googleMapsApiKey = 'AIzaSyBr7t_kZMkAIIUXDyHkB002uPLl95nS3cc';
const libraries = ['places'];
const mapContainerStyle = { width: '100vw', height: '70vh' };

function CreateStaticEvent() {
  // const [map, setMap] = useState(null);
  // const { isLoaded, loadError } = useLoadScript({
  //   googleMapsApiKey: googleMapsApiKey,
  //   libraries,
  // });
  const { register, handleSubmit } = useForm();
  const [lat, setLat] = useState(29.9608572);
  const [lng, setLng] = useState(-90.1193887);
  // const myMapDiv = useRef(null);
  const locationInput = useRef(null);
  // const map =
  //   myMapDiv.current && window.google
  //     ? new window.google.maps.Map(myMapDiv.current, {
  //         center: new window.google.maps.LatLng(lat, lng),
  //         zoom: 15,
  //       })
  //     : null;
  // console.log('LINE 40 || ', map);

  const {
    placesService,
    placePredictions,
    getPlacePredictions,
    isPlacePredictionsLoading,
  } = usePlacesService({
    apiKey: googleMapsApiKey,
  });

  // useEffect(() => {
  //   if (myMapDiv.current && !map) {
  //     setMap(new window.google.maps.Map(myMapDiv.current, {}));
  //   }
  // }, [myMapDiv.current, map]);

  // Get user's geolocation
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        // console.log('LINE 55 || CREATESTATICEVENT', position);
        setLat(position.coords.latitude);
        setLng(position.coords.longitude);
      },
      (err) => {
        console.log('LINE 60 || CREATESTATICEVENT', err);
      }
    );
  }, []);

  // Update autofill positions
  useEffect(() => {
    // fetch place details for the first element in placePredictions array
    if (placePredictions.length)
      service.placesService?.getDetails(
        {
          placeId: placePredictions[0].place_id,
        },
        (placeDetails) => savePlaceDetailsToState(placeDetails)
      );
  }, [placePredictions]);
  console.log('LINE 78 || CREATESTATICEVENT || USEEFFECT', placePredictions);

  // const getLocationByAddress = () => {
  //   const address = '839 Esplanade Ave, New Orleans, LA';
  //   axios
  //     .get(
  //       `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleMapsApiKey}`
  //     )
  //     .then((response) => {
  //       console.log('LINE 83 || CREATESTATICEVENT', response.data);
  //     })
  //     .catch((err) => {
  //       console.log('LINE 86 || CREATESTATICEVENT || ERROR ||', err);
  //     });
  // };
  // getLocationByAddress();

  const onSubmit = (data) => {
    axios
      .post('/event/addEvent', {
        event: {
          eventName: data.eventName,
          eventTime: data.eventTime,
          eventLocation: data.eventLocation,
          friends: [],
        },
      })
      // .then(() => getEvents())
      // .then(() => getFriends())
      .catch((err) => console.error(err));
  };

  const getAutoCompleteResults = () => {
    const input = document.getElementById('pac-input');
    const defaultBounds = {
      north: lat + 0.1,
      south: lat - 0.1,
      east: lng + 0.1,
      west: lng - 0.1,
    };
    const options = {
      bounds: defaultBounds,
      componentRestrictions: { country: 'us' },
      fields: ['address_components', 'geometry', 'icon', 'name'],
      strictBounds: false,
      types: ['establishment'],
    };
    const autoComplete = new window.google.maps.places.Autocomplete(
      input,
      options
    );
    autoComplete.addListener('place_changed', () => {
      console.log('LINE 130 ||', autoComplete.getPlace());
      const newPlace = autoComplete.getPlace();
      console.log('LINE 132 ||', newPlace.geometry.location.lat());
      let newPlaceLat = newPlace.geometry.location.lat();
      let newPlaceLng = newPlace.geometry.location.lng();
      console.log('LINE 135 || MAP', map);
      // const newMarker = new window.google.maps.Marker({
      //   position: { lat: newPlaceLat, lng: newPlaceLng },
      //   map,
      //   title: newPlace.name,
      // });
      // console.log('LINE 141 || ', newMarker, map);
      // newMarker.setMap(map);
    });
    console.log('LINE 144 || CREATESTATICEVENT || AUTOCOMPLETE', autoComplete);
  };

  // if (locationInput.current) {
  //   getAutoCompleteResults();
  // }
  // getAutoCompleteResults();

  // const getMap = () => {
  //   console.log('LINE 124', myMapDiv.current);
  //   if (myMapDiv.current) {
  //     const map = new window.google.maps.Map(myMapDiv.current, {
  //       center: new window.google.maps.LatLng(lat, lng),
  //       zoom: 15,
  //     });
  //   }
  // };
  if (window.google) {
    // if (myMapDiv.current) {
    //   getMap();
    // }
    getAutoCompleteResults();
  }

  // if (loadError) return 'Error loading maps';
  // if (!isLoaded) return <h1>Loading Maps</h1>;
  return (
    <div>
      <Wrapper apiKey={googleMapsApiKey} render={(status) => <h1>{status}</h1>}>
        <Map lat={lat} lng={lng}>
          <Marker options={{ position: { lat, lng } }} />
        </Map>
      </Wrapper>
      <form className="create-event-form" onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* <label className="eventName">Event Name: </label> */}
          <input placeholder="Event Name" {...register('eventName')} />
        </div>

        <div>
          {/* <label className="eventTime">Event Time: </label> */}
          <input placeholder="Event Time" {...register('eventTime')} />
        </div>

        <div>
          {/* <label className="eventLocation">Event Location: </label> */}
          <input
            ref={locationInput}
            id="pac-input"
            type="text"
            autoComplete="on"
            placeholder="Event Location"
            onChange={(e) => getPlacePredictions({ input: e.target.value })}
            loading={isPlacePredictionsLoading.toString()}
            {...register('eventLocation')}
          />
        </div>
        <input type="submit" />
      </form>{' '}
    </div>
  );
}

export default CreateStaticEvent;

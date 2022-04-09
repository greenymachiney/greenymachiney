// import React, { useState, useRef, useEffect } from 'react';
// import { useForm } from 'react-hook-form';
// import axios from 'axios';
// // the google maps wrapper lets my use a google map inside a component
// // import { Wrapper, Status } from '@googlemaps/react-wrapper';
// import GoogleMapReact from 'google-map-react';
// import {
//   GoogleMap,
//   useLoadScript,
//   Marker,
//   InfoWindow,
// } from '@react-google-maps/api';
// import usePlacesService from 'react-google-autocomplete/lib/usePlacesAutocompleteService';
// import Map from './Map.jsx';

// const googleApiKey = 'AIzaSyBr7t_kZMkAIIUXDyHkB002uPLl95nS3cc';
// const libraries = ['places'];
// const mapContainerStyle = { width: '100vw', height: '70vh' };

// const options = {
//   // styles:
// };

// function CreateStaticEvent() {
//   const { isLoaded, loadError } = useLoadScript({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_SERVICES_API_KEY,
//     libraries: ['places'],
//   });
//   const { register, handleSubmit } = useForm();
//   const [lat, setLat] = useState(29.9608572);
//   const [lng, setLng] = useState(-90.1193887);

//   const {
//     placesService,
//     placePredictions,
//     getPlacePredictions,
//     isPlacePredictionsLoading,
//   } = usePlacesService({
//     apiKey: googleApiKey,
//   });

//   const center = {
//     lat: lat,
//     lng: lng,
//   };

//   useEffect(() => {
//     navigator.geolocation.getCurrentPosition(
//       (position) => {
//         console.log('LINE 49 || CREATESTATICEVENT', position);

//         setLat(position.coords.latitude);
//         setLng(position.coords.longitude);
//       },
//       (err) => {
//         console.log('LINE 55 || CREATESTATICEVENT', err);
//       }
//     );
//   }, []);

//   useEffect(() => {
//     // fetch place details for the first element in placePredictions array
//     if (placePredictions.length)
//       service.placesService?.getDetails(
//         {
//           placeId: placePredictions[0].place_id,
//         },
//         (placeDetails) => savePlaceDetailsToState(placeDetails)
//       );
//   }, [placePredictions]);
//   console.log('LINE 70 || CREATESTATICEVENT || USEEFFECT', placePredictions);

//   if (loadError) return 'Error loading maps';
//   if (!isLoaded) return 'Loading Maps';

//   const getLocationByAddress = () => {
//     const address = '839 Esplanade Ave, New Orleans, LA';

//     axios
//       .get(
//         `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${googleApiKey}`
//       )
//       .then((response) => {
//         console.log('LINE 83 || CREATESTATICEVENT', response.data);
//       })
//       .catch((err) => {
//         console.log('LINE 86 || CREATESTATICEVENT || ERROR ||', err);
//       });
//   };
//   getLocationByAddress();

//   const onSubmit = (data) => {
//     axios
//       .post('/event/addEvent', {
//         event: {
//           eventName: data.eventName,
//           eventTime: data.eventTime,
//           eventLocation: data.eventLocation,
//           friends: [],
//         },
//       })
//       // .then(() => getEvents())
//       // .then(() => getFriends())
//       .catch((err) => console.error(err));
//   };

//   const getAutoCompleteResults = () => {
//     const input = document.getElementById('pac-input');
//     const defaultBounds = {
//       north: lat + 0.1,
//       south: lat - 0.1,
//       east: lng + 0.1,
//       west: lng - 0.1,
//     };
//     const options = {
//       bounds: defaultBounds,
//       componentRestrictions: { country: 'us' },
//       fields: ['address_components', 'geometry', 'icon', 'name'],
//       strictBounds: false,
//       types: ['establishment'],
//     };
//     const autoComplete = new google.maps.places.Autocomplete(input, options);
//     console.log('LINE 122 || CREATESTATICEVENT || AUTOCOMPLETE', autoComplete);
//   };
//   getAutoCompleteResults();

//   const initMap = () => {
//     console.log('initMap called');
//     const map = new google.maps.Map(document.getElementById('map'), {
//       center: { lat: 29, lng: -90 },
//       zoom: 15,
//     });
//   };
//   // initMap();

//   // initMap();
//   // useEffect(window.initMap, []);

//   return (
//     <div>
//       <div>Map</div>
//       {/* <script
//         async
//         src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBr7t_kZMkAIIUXDyHkB002uPLl95nS3cc&libraries=places&callback=initMap"
//       ></script> */}
//       {/* <div
//         type="HTMLElement"
//         // className="create-event-map"
//         id="map"
//         style="width: auto; height: 550px; position: relative; overflow: hidden;"
//       >
//         {/* <GoogleMap
//           // className="create-event-map"
//           mapContainerStyle={mapContainerStyle}
//           zoom={15}
//           center={center}
//         />
//       </div> */}
//       <form className="create-event-form" onSubmit={handleSubmit(onSubmit)}>
//         <div>
//           {/* <label className="eventName">Event Name: </label> */}
//           <input placeholder="Event Name" {...register('eventName')} />
//         </div>

//         <div>
//           {/* <label className="eventTime">Event Time: </label> */}
//           <input placeholder="Event Time" {...register('eventTime')} />
//         </div>

//         <div>
//           {/* <label className="eventLocation">Event Location: </label> */}
//           <input
//             id="pac-input"
//             type="text"
//             autoComplete="on"
//             placeholder="Event Location"
//             onChange={(e) => getPlacePredictions({ input: e.target.value })}
//             loading={isPlacePredictionsLoading.toString()}
//             {...register('eventLocation')}
//           />
//         </div>
//         <input type="submit" />
//       </form>{' '}
//     </div>
//   );
// }

// export default CreateStaticEvent;

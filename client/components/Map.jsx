import React, {
  Children,
  useState,
  useRef,
  useEffect,
  isValidElement,
  cloneElement,
} from 'react';
import { useLoadScript } from '@react-google-maps/api';

const googleMapsApiKey = 'AIzaSyBr7t_kZMkAIIUXDyHkB002uPLl95nS3cc';
const libraries = ['places'];

function Map({ children, lat, lng, onClick }) {
  const [map, setMap] = useState(null);
  const [service, setService] = useState(null);
  const myMapDiv = useRef(null);
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: googleMapsApiKey,
    libraries,
  });

  const handleClick = (event) => {
    console.log('LINE 24 || MAP ||', event);
    if (event.placeId) {
      const request = {
        placeId: event.placeId,
        fields: ['name', 'address_component', 'geometry', 'icon'],
      };
      console.log('LINE 30 || MAP || SERVICE', service, service.getDetails);
      service.getDetails(request, (place, status) => {
        if (status == google.maps.places.PlacesServiceStatus.OK) {
          console.log('LINE 33 || MAP || PLACE', place.address_components);
        }
      });
    }
  };

  useEffect(() => {
    if (map) {
      if (!service) {
        setService(new google.maps.places.PlacesService(map));
      } else {
        map.addListener('click', handleClick);
      }
    }
  }, [map, service]);

  // console.log('LINE 15 || MAP||', children);
  useEffect(() => {
    if (myMapDiv.current && !map) {
      setMap(
        new window.google.maps.Map(myMapDiv.current, {
          center: new window.google.maps.LatLng(lat, lng),
          zoom: 16,
        })
      );
    }
  }, [myMapDiv.current, map]);

  // return <div className="create-event-map" id="map" ref={myMapDiv}></div>;
  if (loadError) return 'Error loading maps';
  if (!isLoaded) return <h1>Loading Maps</h1>;
  return (
    <>
      <div ref={myMapDiv} id="map">
        {Children.map(children, (child) => {
          if (isValidElement(child)) {
            // console.log('LINE 41 || MAP.JSX ||', child);
            return cloneElement(child, { map });
          }
        })}
      </div>
    </>
  );

  // React.createElement(
  //   React.Fragment,
  //   null,
  //   React.createElement('div', { ref: myMapDiv, style: style }),
  //   React.Children.map(children, (child) => {
  //     if (React.isValidElement(child)) {
  //       // set the map prop on the child component
  //       return React.cloneElement(child, { map });
  //     }
  //   })
  // );
}

export default Map;

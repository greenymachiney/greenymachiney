import React, { useState, useEffect } from 'react';

function Marker({ options, map }) {
  const [marker, setMarker] = useState();
  console.log('LINE 5 || MARKER', marker);
  console.log('LINE 6 || MAP', map);
  useEffect(() => {
    if (!marker) {
      console.log('LINE 9 || MARKER');
      setMarker(
        new window.google.maps.Marker({
          position: options.position,
          map: map,
          visible: true,
          zIndex: 999,
          icon: '',
        })
      );
    }

    // remove marker from map on unmount
    return () => {
      if (marker) {
        console.log('LINE 22 || MARKER');
        marker.setMap(null);
      }
    };
  }, [marker]);
  useEffect(() => {
    if (marker) {
      console.log('LINE 29 || MARKER');
      marker.setOptions({
        position: options.position,
        map,
        visible: true,
        zIndex: 999,
      });
    }
  }, [marker, options]);
  return null;
}

export default Marker;

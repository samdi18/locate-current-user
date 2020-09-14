import React, { useState } from 'react';
import ReactMapGL, {
  FullscreenControl,
  GeolocateControl,
  Marker,
} from 'react-map-gl';

import { library } from '@fortawesome/fontawesome-svg-core';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

library.add(faMapMarkerAlt);

const MapBox = () => {
  const [viewport, setViewport] = useState({
    width: '100vw',
    height: '100vh',
    latitude: 23.777176,
    longitude: 90.399452,
    zoom: 10,
  });

  const [userLocation, setUserLocation] = useState(null);

  const handleClick = () => {
    console.log('clicking');

    const location = () => {
      navigator.geolocation.getCurrentPosition((position) => {
        let userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        let newViewport = {
          height: '100vh',
          width: '100vw',
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          zoom: 12,
        };
        setViewport(newViewport);
        setUserLocation(userLocation);

        console.log({ userLocation });
      });
    };

    location();
  };

  return (
    <div className='map-container'>
      <button onClick={handleClick}>My location</button>
      <ReactMapGL
        {...viewport}
        onViewportChange={(nextViewport) => setViewport(nextViewport)}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        mapStyle='mapbox://styles/mapbox/dark-v9'
      >
        {userLocation && (
          <Marker longitude={userLocation.lng} latitude={userLocation.lat}>
            <div>
              <FontAwesomeIcon icon='map-marker-alt' size='2x' color='blue' />
            </div>
          </Marker>
        )}
      </ReactMapGL>
    </div>
  );
};

export default MapBox;

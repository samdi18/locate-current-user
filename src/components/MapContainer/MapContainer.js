import React, { useEffect, useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import axios from 'axios';
import MapModal from './MapModal';

const MapContainer = () => {
  const [currentPosition, setCurrentPosition] = useState({});
  const [isOpen, setOpen] = useState(false);

  const success = (position) => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude,
    };
    setCurrentPosition(currentPosition);
  };

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  }, []);

  const mapStyles = {
    height: '100vh',
    width: '100vw',
    position: 'absolute',
    top: '0',
    left: '0',
  };

  const handleClick = () => {
    setOpen(true);
  };

  // const initialCenter = {
  //   lat: 23.8737,
  //   lng: 90.3964,
  // };

  return (
    <>
      <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_API_TOKEN}>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center={currentPosition}
        >
          {currentPosition && (
            <Marker position={currentPosition} onClick={handleClick} />
          )}
        </GoogleMap>
      </LoadScript>

      {isOpen && (
        <MapModal setOpen={setOpen} currentPosition={currentPosition} />
      )}
    </>
  );
};

export default MapContainer;

import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import React from "react";

const center = {lat: 30.320976, lng: 78.084581}
const containerStyle = {
  width: '100%',
  height: '100%'
};

export let specsx = {lat: 0, lng: 0, zoom: 15};

export function MapAp() {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })
  if (!isLoaded) {
    return <div>Loading...</div>
  }
  return <Map/>;
}

function Map() {
  const [mapref, setMapRef] = React.useState(null);
  const handleOnLoad = map => {
    setMapRef(map);
  };
  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      specsx.lat = newCenter.lat();
      specsx.lng = newCenter.lng();
      specsx.zoom = mapref.zoom;
      console.debug("specsx: "+specsx);
    }
  };

  return (
      <GoogleMap zoom={15} center={center}
                 mapContainerStyle={containerStyle} mapTypeId="hybrid"
                 onLoad={handleOnLoad}
                 onCenterChanged={handleCenterChanged}></GoogleMap>
  )
}

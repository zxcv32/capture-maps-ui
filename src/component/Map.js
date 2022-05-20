import {GoogleMap, useLoadScript} from "@react-google-maps/api";
import React from "react";

const center = {lat: 30.316963, lng: 78.032560}
const containerStyle = {
  width: '100%',
  height: '100%'
};

export let specs = {
  lat: center.lat,
  lng: center.lng,
  zoom: 15,
  radius: 5
};

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
      specs.lat = newCenter.lat();
      specs.lng = newCenter.lng();
      // Override from UI input
      specs.zoom = mapref.zoom;
      specs.radius = 5  // TODO calculate or fetch from backend dynamically
      console.debug("specs: " + JSON.stringify(specs));
    }
  };

  return (
      <GoogleMap zoom={13} center={center}
                 mapContainerStyle={containerStyle} mapTypeId="hybrid"
                 onLoad={handleOnLoad}
                 onCenterChanged={handleCenterChanged}></GoogleMap>
  )
}

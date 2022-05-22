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
  radius: 3,
  mapTypeId: "hybrid"
};

export function MapAp({
  setDisplayLat,
  setDisplayLng,
  setMapZoom,
  setMapTypeId,
  setFormZoom
}) {
  const {isLoaded} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
  })
  if (!isLoaded) {
    return <div>Loading...</div>
  }
  return <Map setDisplayLat={setDisplayLat} setDisplayLng={setDisplayLng}
              setMapZoom={setMapZoom} setMapTypeId={setMapTypeId}
              setFormZoom={setFormZoom}/>;
}

function Map({
  setDisplayLat,
  setDisplayLng,
  setMapZoom,
  setMapTypeId,
  setFormZoom
}) {
  const [mapref, setMapRef] = React.useState(null);
  const handleOnLoad = map => {
    setMapRef(map);
  };

  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      setDisplayLat(parseFloat(newCenter.lat().toFixed(6)));
      setDisplayLng(parseFloat(newCenter.lng().toFixed(6)));
      setMapZoom(mapref.zoom);
      setFormZoom(mapref.zoom);
    }
  };

  function handleOnMapTypeIdChanged() {
    if (mapref) {
      setMapTypeId(mapref.mapTypeId);
    }
  }

  return (
      <GoogleMap zoom={13} center={center}
                 mapContainerStyle={containerStyle} mapTypeId="hybrid"
                 onLoad={handleOnLoad}
                 onCenterChanged={handleCenterChanged}
                 onMapTypeIdChanged={handleOnMapTypeIdChanged}
      ></GoogleMap>
  )
}

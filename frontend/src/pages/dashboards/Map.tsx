import { useState } from "react";
import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
const apiMaps = "AIzaSyDs4xUgRzNEAGN-WXUjEKmug0i9P2nKY70";

export function Maps(props: any) {
  return (
    <>
      <Map
        google={props.google}
        zoom={14}
        initialCenter={{
          lat: 22.717239,
          lng: 75.87747,
        }}
        style={{ width: "50%" }}
      ></Map>
    </>
  );
}

export default GoogleApiWrapper({
  apiKey: apiMaps,
})(Maps);

import { useEffect } from "react";
import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = ({ apiKey, latitude, longitude, streetName }) => {
  useEffect(() => {
    // Load the Google Maps JavaScript API script dynamically
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
    script.async = true;
    script.onload = initMap;
    document.head.appendChild(script);

    // Initialize the map
    const initMap = () => {
      const map = new window.google.maps.Map(
        document.getElementById("google-map"),
        {
          center: { lat: latitude, lng: longitude },
          zoom: 15,
        }
      );

      // Add a marker to the map
      new window.google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: map,
        title: streetName,
      });
    };
  }, [apiKey, latitude, longitude, streetName]);
  return <div id="google-map" style={{ height: "400px", width: "100%" }}></div>;
};

export default MapComponent;

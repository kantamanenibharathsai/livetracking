import React, { useState, useEffect } from "react";
import { GoogleMap, LoadScript, Marker, DirectionsRenderer, PolygonF, Polyline } from "@react-google-maps/api";
import { apiKey } from "../../utils/data";

const mapContainerStyle = {
  width: "100%",
  height: "500px",
};

const defaultCenter: google.maps.LatLngLiteral = { lat: 37.7749, lng: -122.4194 }; // Default (SF)

const secondLocation: google.maps.LatLngLiteral = { lat: 17.0522, lng: 78.5437 };
 // Los Angeles (Manually Set)

const GoogleMapComponent: React.FC = () => {
  const [currentLocation, setCurrentLocation] = useState<google.maps.LatLngLiteral | null>(null);
  const [directions, setDirections] = useState<google.maps.DirectionsResult | null>(null);
  const dummyPoliData = [currentLocation ? currentLocation :defaultCenter,secondLocation]
  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const userLocation = { lat: latitude, lng: longitude };
          setCurrentLocation(userLocation);
          fetchDirections(userLocation, secondLocation);
        },
        (error) => console.error("Error fetching location:", error),
        { enableHighAccuracy: true }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  }, []);

  const fetchDirections = (origin: google.maps.LatLngLiteral, destination: google.maps.LatLngLiteral) => {
    if (!window.google || !window.google.maps) return;

    const directionsService = new google.maps.DirectionsService();
    directionsService.route(
      {
        origin,
        destination,
        travelMode: google.maps.TravelMode.WALKING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
          console.log(result)
        } else {
          console.error("Error fetching directions:", status);
        }
      }
    );
  };

  return (
    <LoadScript googleMapsApiKey='AIzaSyB2RcDMneRf0ggsofqQk-lkvl1dGgpLLWA'>
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={6}
        center={currentLocation || defaultCenter}
      >
        {/* Markers */}
        {currentLocation && <Marker position={currentLocation} label="A" />}
        <Marker position={secondLocation} label="B" />

        {/* Route Between the Two Markers */}
        {directions && <DirectionsRenderer directions={directions} />}
        <Polyline path={dummyPoliData}></Polyline>
      </GoogleMap>
    </LoadScript>
  );
};

export default GoogleMapComponent;

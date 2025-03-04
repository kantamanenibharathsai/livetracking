import React, { useEffect } from "react";
import { socket } from "../Socket";
import { trackingDeviceLocaton } from "../utils/data";

const DeviceLocation: React.FC = () => {
  const updateLocation = (latitude:Number,longitude:Number) => {
    const result = fetch('http://localhost:5000/api/postlocations',{
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        latitude:latitude,
        longitude: longitude
      })
    })
  }
  useEffect(() => {
    if ("geolocation" in navigator) {
      setInterval(() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            updateLocation(latitude, longitude)
            console.log(latitude,longitude)
            socket.emit("sendLocation", { latitude, longitude });
          },
          (error) => console.error("Location Error:", error),
          { enableHighAccuracy: true }
        );
      }, 300000);
    }
  }, []);

  return <p>{trackingDeviceLocaton}</p>;
};

export default DeviceLocation;

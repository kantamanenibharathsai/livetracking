import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { socket } from "../Socket";
import { Box, Typography } from "@mui/material";

const containerStyle = { width: "100%", height: "500px" };
const apiKey = "AIzaSyBHnEgPjy_Xj9gTTK7x42fIDwiIqZNlT_w"
const LiveTracking: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
  });

  const [locations, setLocations] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/locations")
      .then((res) => res.json())
      .then((data) => setLocations(data));

    socket.on("locationUpdate", (data) => {
      setLocations((prev) => [...prev, data]);
    });
  console.log(locations[0],"location")
    return () => {socket.off("locationUpdate")};
  }, []);

  return isLoaded ? (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>Live Tracking</Typography>
      <GoogleMap mapContainerStyle={containerStyle} center={{lat: locations[0]?.latitude, lng: locations[0]?.longitude}} zoom={15} mapTypeId="satellite">
        {locations.map((loc, index) => (
          <Marker key={index} position={{lat: loc.latitude, lng: loc.longitude}} />
        ))}
      </GoogleMap>
    </Box>
  ) : (
    <Typography>Loading map...</Typography>
  );
};

export default LiveTracking;

import React, { useEffect, useState } from "react";
import { GoogleMap, Marker, Polygon, useJsApiLoader ,Polyline } from "@react-google-maps/api";
import { socket } from "../Socket";
import { Box, Typography } from "@mui/material";
import { apiKey, dummyLocations, loadingMap } from "../utils/data";

const containerStyle = { width: "100%", height: "500px" };

const polylineOptions = {
  strokeColor: "#FF0000",
  strokeOpacity: 1.0,
  strokeWeight: 4,
};

const LiveTracking: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: apiKey || "",
  });

  const [locations, setLocations] = useState<any[]>([]);
  const [polygon, setPolygon] = useState<{
    lat: number, lng: number
  }[]>([])
  useEffect(() => {
    fetch("http://localhost:3000/api/locations")
      .then((res) => res.json())
      .then((data) => {
        setLocations(data)
        console.log(data[0], "data")
        setPolygon(data)
      });

    socket.on("locationUpdate", (data) => {
      setLocations((prev) => [...prev, data]);
    });

    return () => { socket.off("locationUpdate") };
  }, []);
  // console.log(polygon, "polygons")
  // console.log(locations, "location")


  return isLoaded ? (
    <Box>
      <Typography variant="h5" sx={{ textAlign: "center", mb: 2 }}>Live Tracking</Typography>
      <GoogleMap mapContainerStyle={containerStyle} center={{ lat: dummyLocations[0].lat, lng: dummyLocations[0].lng }} zoom={15} mapTypeId="satellite">
        { dummyLocations.length > 1 && dummyLocations.map((loc, index) => (
          <Marker key={index} position={{ lat: loc.lat, lng: loc.lng }} />

        ))}
         { dummyLocations.length > 1 && dummyLocations.map((loc, index) => (
          <Polygon key={index} paths={dummyLocations} options={{ strokeColor: "green", strokeOpacity: 1, strokeWeight: 2, fillColor: "pink", fillOpacity: 0.5 }} />
        ))}
  <Polyline path={dummyLocations.map((m) => m)} options={polylineOptions} />
      </GoogleMap>
    </Box>
  ) : (
    <Typography>{loadingMap}</Typography>
  );
};

export default LiveTracking;

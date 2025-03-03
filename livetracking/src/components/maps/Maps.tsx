import { Box } from "@mui/material"
import { useEffect, useState } from "react";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
const styles = {
    mapsContainer: {
        height: "100vh",
        width: "100%",
        position: "relative",
        overflow: "hidden"
    }
}
const containerStyle = { width: "100%", height: "500px" };
const defaultCenter = { lat: 28.7041, lng: 77.1025 };
const Maps = () => {
    const [locations, setLocations] = useState<{ lat: number; lng: number }>({
        lat: defaultCenter.lat,
        lng: defaultCenter.lng,

    });
    const apiKey = 'AIzaSyAil3Ad2HOqp1I4QR1tA5iOnGF72pBI4jI'
    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: apiKey || "",
    });
    useEffect(() => {
        if ("geolocation" in navigator) {
            setInterval(() => {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        setLocations({ lat: latitude, lng: longitude })
                        // socket.emit("sendLocation", { latitude, longitude });
                        console.log(locations)
                    },
                    (error) => console.error("Location Error:", error),
                    { enableHighAccuracy: true }
                );
            }, 3000);
        }
    }, []);

    return (
        <Box sx={styles.mapsContainer}>
            {
                isLoaded ?
                <GoogleMap mapContainerStyle={containerStyle} center={locations} zoom={10}>
                    <Marker position={{ lat: locations.lat, lng: locations.lng }} draggable={true} onDraggableChanged={() => { console.log() }} />
                </GoogleMap>
                :
                <>loading...</>
            }
        </Box>
    )
}
export default Maps
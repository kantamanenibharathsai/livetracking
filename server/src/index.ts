import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db";
import locationRoutes from "./routes/locationRoutes";
import { Location } from "./modals/Location";

dotenv.config({
    path: "./config.env",
});
connectDB();

const app = express();
const server = createServer(app);

app.use(cors());
app.use(express.json());
app.use("/api", locationRoutes);

const io = new Server(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("Device Connected:", socket.id);

  socket.on("sendLocation", async (data) => {
    console.log("Received Location:", data);
    try {
      const newLocation = new Location(data);
      await newLocation.save();
    } catch (err) {
      console.error("Error saving location:", err);
    }
    io.emit("locationUpdate", data);
  });

  socket.on("disconnect", () => {
    console.log("Device Disconnected:", socket.id);
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

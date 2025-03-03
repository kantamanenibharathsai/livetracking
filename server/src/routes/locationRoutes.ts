import express from "express";
import { getLocations, postlocations } from "../controllers/locationControlers";

const router = express.Router();

router.get("/locations", getLocations);
router.post("/postlocations",postlocations)

export default router;

import express from "express";
import { clearLocations, getLocations, postlocations } from "../controllers/locationControlers";

const router = express.Router();

router.get("/locations", getLocations);
router.post("/postlocations",postlocations);
router.get("/clear",clearLocations);

export default router;

import { Request, Response } from "express";
import { Location } from "../modals/Location";

export const getLocations = async (req: Request, res: Response) => {
  try {
    const locations = await Location.find();
    res.json(locations);
  } catch (error) {
    res.status(500).json({ error: "Error fetching locations" });
  }
};
export const postlocations = async(req:Request,res:Response) => {
try{
    const newLocation = new Location(req.body);
    const savedLocation = await newLocation.save();
    res.json(savedLocation);
  } catch(error){
    res.status(400).json({ error: "Invalid location data" });
  
}
}

  



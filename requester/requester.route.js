import express from "express";
import { Requester } from "./requester.model.js";




const router= express.Router();


router.post("/requester/add",async(req,res)=>{
    try {
        const { fullName,phoneNumber,bloodType,location } = req.body;

        // Basic validation
        if (!fullName || !phoneNumber || !bloodType || !location) {
            return res.status(400).json({ error: 'Fill all the data' });
        }

      

        // Create a new parking slot
        const newRequest = new Requester({ fullName, phoneNumber,bloodType,location });
        await newRequest.save();

        res.status(201).json({ message: 'Request is added successfully.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error.' });
    }
})

router.get("/request/all",async(req,res)=>{
    try {
        const request = await Requester.find();
        console.log('Request:',request);
        res.json(request);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }

})
export default router;
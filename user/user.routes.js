import express from "express";
import { loginUser, registerUser } from "./user.service.js";
// import { isUser } from "../auth/auth.middleware.js";
import { User } from "./user.model.js";

const router= express.Router();


//register users
router.post("/user/register",registerUser);

//login user
router.post("/user/login",loginUser);


router.get("/user/all",async(req,res)=>{
    try {
        const users = await User.find();
        console.log('User:',users);
        res.json(users);
      } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
      }

})

// Define API endpoint for filtering donors
router.post("/api/filterDonors", async (req, res) => {
  try {
    const { fullName, bloodType, location } = req.body;

    // Construct the filter object based on the provided criteria
    const filter = {};
    if (fullName) filter.fullName = fullName;
    if (bloodType) filter.bloodType = bloodType;
    if (location) filter.location = location;

    // Query the database with the constructed filter
    const filteredDonors = await User.find(filter); 

    res.json(filteredDonors);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});
export default router;
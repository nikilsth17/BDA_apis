import express from "express";
import { Donor } from "./donor.model.js";
import { addValidationSchema } from "./donor.validation.js";
import { isUser } from "../auth/auth.middleware.js";


const router= express.Router();


//register as donor
router.post("/donor/register",isUser,async(req,res)=>{
    //? phase 2
    //extract product from req.body
    const newDonor=req.body;
    // validate product using Joi
    try {
        await addValidationSchema.validateAsync(newDonor);
    } catch (error) {
            // if validate finally, terminate
        return res.status(400).send({message:error.message});
    }

    //add sellerId
    newDonor.userId=req.userInfo._id;

    // create new product
    await Donor.create(newDonor);
    
    // send response 
    return res.status(201).send({message:"Donor is added successfully."});
})


  

export default router;
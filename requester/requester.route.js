import express from "express";
import { isUser } from "../auth/auth.middleware.js";
import { addRequestValidationSchema } from "./requester.validation.js";
import { Requester } from "./requester.model.js";




const router= express.Router();


router.post("/requester/add",isUser,async(req,res)=>{
    const newRequester= req.body;
    try {
        await addRequestValidationSchema.validateAsync(newRequester);
    } catch (error) {
        return res.status(400).send({message:error.message});
    }
    newRequester.userId= req.userInfo._id;
    await Requester.create(newRequester);
    console.log(newRequester)
    return res.status(201).send({message:"Request is add successfully.."});
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
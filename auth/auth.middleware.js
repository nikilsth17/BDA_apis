import { User } from "../user/user.model.js";
import jwt from "jsonwebtoken";

// just logged in user 
export const isUser=async(req,res,next)=>{

    try {
        //?phase1
   
       // extract token from headers 
       const authorization= req?.headers?.authorization;
       const splittedArray=authorization?.split(" ");
       const token= splittedArray?.length===2 && splittedArray[1];

       // if not token, terminate
       if (!token){
           throw Error("Unathourised");
       };

       // decrypt token using JsonWebTokenError.verify(token, secret key)
       const userData=jwt.verify(token,process.env.JWT_ACCESS_TOKEN_SECRET_KEY);
       
       // find user from email decrypted from token 
       const user= await User.findOne({email:userData.email});
       // if not User, terminate
       if(!user){
           throw new Error("Unauthorised");
       }
    
       req.userInfo= user;
       next();
   } catch (error) {
       return res.status(401).send({message:"Unauthourised."})
   }
};
import mongoose from "mongoose";

export const donorSchema= new mongoose.Schema({
    fullName:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:55,
    },
    bloodType:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:20,
    },
    location:{
        type:String,
        required:true,
        trim:true,
        minlength:2,
        maxlength:55,
    },
    phoneNumber:{
        type:Number,
        required:true,
        minlength:10,
    }
});

export const Donor= mongoose.model("Donor",donorSchema);
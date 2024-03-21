import express from "express";
import { dbConnect } from "./db_connect.js";
import userRoutes from "./user/user.routes.js";
import donorRoutes from "./donor/donor.routes.js";
import cors from "cors";
const app= express();

app.use(cors({origin:"*"}));
app.use(express.json());

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","*");
    next();
});


app.use(userRoutes);
app.use(donorRoutes);
dbConnect();

const port= process.env.PORT;

console.log(port)

app.listen(port,()=>{
    console.log(`App is listening on port ${port}. `);
})
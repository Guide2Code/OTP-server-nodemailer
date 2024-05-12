import connectDB from "./config/db.js";
import express from "express";
import UserSchema from './model.js'
import nodemailer from 'nodemailer'
import cors from 'cors';
const app = express();
connectDB();
app.use(cors());
app.use(express.json())
app.listen(6800, () => {
    console.log("Server is running on port 6000");
});

//create /generate otp
const transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:587,
    auth:{
        user:"guide2code@gmail.com",
        pass:"pbfd iwtc tesa yubf"
    }

});

app.post("/create/user",async (req, res) => {
    try {
        const {name} = req.body;
       const  {email} = req.body;
        const user = new UserSchema({
            name,
            email
        });
        await user.save();
        res.status(200).send({
                message: "User created successfully"
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
            message:"Server error: " 
        });
        console.log(error);
    }
})


app.post("/generate/otp",async (req, res) => {
    try {
        const {email} = req.body;
        if(!email) return res.status(404).send({message: "Invalid email"})
        const otp = Math.floor(Math.random() * 100000);
         await UserSchema.findOneAndUpdate({email},{otp});
        console.log(otp);
        res.status(200).send({
                message: "OTP generated successfully"
        });
    } catch (error) {
        res.status(500).send({
            error: error.message,
            message:"Server error: " 
        });
        console.log(error);
    }
})

app.put('/verify',async(req,res)=>{
    try {
        const {otp} = req.body;
        const {email} = req.body;
        console.log(otp,email)
        const user = await UserSchema.findOne({email});
        if(user.otp == otp){
            return res.status(200).send({
                message: "OTP verified successfully"
            });
        }
        else{
            return res.status(404).send({
                message: "OTP not verified"
            });
        }

    } catch (error) {
        res.status(500).send({
            error: error.message,
            message:"Server error: " 
        });
    }
})

app.get("/",(req, res) => {
    try {
        res.status(200).send({
            message: "Hello World"
        });    
    } catch (error) {
        res.status(500).send({
            message:"helloworld"
        })
    }
})
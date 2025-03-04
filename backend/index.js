import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import auth from "./middleware.js";
import { generateRoomID } from "./utility.js";

const app = express();

const prisma = new PrismaClient();

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
    res.send("Hello World");
});

app.post("/api/v1/signup", async (req, res) => {
    
    try {
        console.log("signnup end point hit")
        const { email, password } = req.body;
        if (!email || !password) {
            return res.json({ message: "All fields are required",
                isSuccess : false
             });
        }
        const founduser = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (founduser) {
            return res.json({ message: "User already exists" , isSuccess : false });
        }
        const user = await prisma.User.create({
            data: {
                email,
                password
            }
        });
        res.status(200).json({ message: "Signup successful" , isSuccess : true});
    } catch (error) {
        res.status(500).json({ message: "Signup failed" });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    try {   
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required",isSuccess : false });
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(400).json({ message: "User not found",isSuccess : false });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" , isSuccess : false});
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(200).json({ token: token , isSuccess : true});
    } catch (error) {
        res.status(500).json({ message: "Signin failed",isSuccess : false });
    }
});

app.post("api/v1/createRoom",auth,(req,res)=>{
    try{
           const token =  generateRoomID()
           console.log(token)
    }catch(e){
        res.json({message:"error happened"})
    }
})

app.get("/api/v1/joinRoom", auth , async (req, res) => {
    const token = req.headers.authorization;
    
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});




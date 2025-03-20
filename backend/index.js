import express from "express";
import cors from "cors";
import jwt from "jsonwebtoken";
import auth from "./middleware.js";
import { PrismaClient } from "@prisma/client";
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
            console.log("control reach here 1st")
            return res.status(400).json({ message: "All fields are required",isSuccess : false });
        }
        console.log("control reach here 2st")
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        console.log("control reach here 3st")
        if (!user) {
            return res.status(400).json({ message: "User not found",isSuccess : false });
        }
        console.log("control reach here 4st")
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" , isSuccess : false});
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(200).json({ token: token , isSuccess : true});
    } catch (error) {
        res.status(500).json({ message: "Signin failed",isSuccess : false });
    }
});


app.post("/api/v1/joinRoom", auth , async (req, res) => {
    try{
        const {roomId} = req.body
        const foundRoom = await prisma.Room.findUnique({
            where:{
                roomId:roomId
            }
        })
        if(!foundRoom){
            res.json({
                message:"no room found",
                isSuccess:"false"
            })
        }
        // WS connection with a room ID
    }catch(e){
        
        res.status(500).json({ message: "Error occured",isSuccess : false });
    }
   
   
    
});
app.post("/api/v1/createRoom", auth , async (req, res) => {

    console.log("createROom end point hitted")

    try{
        const roomID = generateRoomID()
        console.log(roomID)
        const {socket} = req.body
        console.log(socket)
        const room = await prisma.Room.create({
            data:
            {
            roomId: roomID,
            userId: req.userId,
        }})
        
        res.json({"message":"Room id generated successfully",roomID})
    }catch(e){
        res.json({"message":"error occured"})
    }
   
    
});



app.listen(3000, () => {
    console.log("Server is running on port 3000");
});




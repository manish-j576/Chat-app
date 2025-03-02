import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import jwt from "jsonwebtoken";
import auth from "./middleware.js";

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
            return res.status(400).json({ message: "All fields are required" });
        }
        const founduser = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (founduser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const user = await prisma.User.create({
            data: {
                email,
                password
            }
        });
        res.status(200).json({ message: "Signup successful" });
    } catch (error) {
        res.status(500).json({ message: "Signup failed" });
    }
});
app.post("/api/v1/signin", async (req, res) => {
    try {   
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }
        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid password" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);
        res.status(200).json({ token: token });
    } catch (error) {
        res.status(500).json({ message: "Signin failed" });
    }
});

app.get("/api/v1/protected", auth , async (req, res) => {
    const token = req.headers.authorization;
    res.status(200).json({ message: "Protected route accessed" });
});

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});




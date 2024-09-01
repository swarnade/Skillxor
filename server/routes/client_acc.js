const express = require("express");
const  {Clients}  = require("../Models");
const zod = require("zod");
const {hashPassword} = require( "../Short_Hand/Password");
const jwt = require("jsonwebtoken");

const clientRouter = express.Router();
module.exports = clientRouter;

const signupObject = zod.object({
    email: zod.string().email(),
    password: zod.string().min(8),
    mobileNumber: zod.string().min(10).max(10),
    firstName: zod.string().max(30),
    lastName: zod.string().max(30),
    country: zod.string().max(30),
})

const signinObject = zod.object({
    username: zod.string().email(),
    password: zod.string().min(8)
})

clientRouter.post("/auth/signup", async (req, res) => {
    const { firstName, lastName, email, password, mobileNumber, country } = req.body;

    const {success} = signupObject.safeParse(req.body);
    if (!success) {
        return res.status(400).json({
            message: "Invalid request body"
        })
    }

    const alreadyExists = await Clients.findOne({
        email: email
    })
    if (alreadyExists) {
        return res.status(400).json({
            message: "User already exists"
        })
    }

    const hashedPassword = await hashPassword(password);

    const newClient = await Clients.create({
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: hashedPassword,
        mobileNumber: mobileNumber,
        country: country
    })

    const token = jwt.sign({
        email: email,
        id: newClient._id
    }, process.env.JWT_SECRET)

    return res.status(200).json({
        message: "User created",
        token: token
    })
});

clientRouter.post("/auth/login", async (req, res) => {
    const { email, password } = req.body;
    const {success} = signinObject.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            messege: "Invalid inputs"
        })
    }

    const client = await Clients.findOne({
        email: email,
        password: password
    })

    if (client) {
        const token = jwt.sign({
            email: email,
            id: client._id
        }, process.env.JWT_SECRET)
        return res.status(200).json({
            token: token
        })
    }
    
    res.status(411).json({
        messege: "Invalid username or password"
    })
})
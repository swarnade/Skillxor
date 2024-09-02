const express = require("express");
const  {Clients, Freelancers}  = require("../Models");
const zod = require("zod");
const {hashPassword, verifyPassword} = require( "../Short_Hand/Password");
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
    email: zod.string().email(),
    password: zod.string().min(8)
})


clientRouter.get('/',async (req,res)=>{
    res.status(200).json({
        status: "200",
        description: "success",
        route: "Client Profile",
      });
})

clientRouter.post("/signup", async (req, res) => {
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

    const isFreelancer = await Freelancers.findOne({
        email: email
    })
    if (isFreelancer) {
        return res.status(400).json({
            message: "User already exists as a freelancer"
        })
    }

    const hashedPassword = await hashPassword(password);

    try {
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
    } catch (err) {
        return res.status(500).json({
            message: "can not create user"
        })
    }
});

clientRouter.post("/login", async (req, res) => {
    const { email, password } = req.body;
    const {success} = signinObject.safeParse(req.body);

    if (!success) {
        return res.status(411).json({
            messege: "Invalid inputs"
        })
    }
    const client = await Clients.findOne({
        email: email,
    })

    const validPass = verifyPassword(password, client.password);
    if (!validPass) {
        return res.status(400).json({
            messege: "Invalid username or password"
        })
    }

    if (client) {
        const token = jwt.sign({
            email: email,
            id: client._id
        }, process.env.JWT_SECRET)
        return res.status(200).json({
            status:"Success",
            token: token
        })
    }
    
    res.status(400).json({
        messege: "Invalid username or password"
    })
})

clientRouter.post("/delete", (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    Clients.deleteOne({
        _id: id
    }).then(() => {
        res.status(200).json({
            messege: "account deleted"
        })
    }).catch(() => {
        res.status(500).json({
            messege: "Can not delete"
        })
    })
})

clientRouter.get("/allprofiles", async (req, res) => {
    try {
        const data = await Clients.find({})
        res.status(200).json({
            status: "Success",
            profile: data
        })
    } catch {
        res.status(404).json({
            status: "Failed",
            profile: null
        })
    }
})

// profile management
// get specific profile
clientRouter.get("/profile", async (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const client = await Clients.findOne({
        _id: id
    })
    if (client) {
        return res.status(200).json({
            status: "Success",
            profile: client
        })
    }
    res.status(404).json({
        status: "Failed",
        profile: null
    })
})

// edit profile
clientRouter.put("/profile", async (req, res) => {
    const token = req.headers.authorization;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.id;
    const client = await Clients.findOne({
        _id: id
    })
    if (client) {
        const { bio, country, firstName, lastName, profilePicture } = req.body;
        await Clients.updateOne({
            _id: id
        }, {
            firstName: firstName,
            lastName: lastName,
            bio: bio,
            profilePicture: profilePicture,
            country: country
        })
        return res.status(200).json({
            status: "Profile updated",
            profile: client
        })
    }
})

clientRouter.get("*", (req, res) => {
    res.status(404).json({status:404, message:"Page not found error || 404 Error"});
});
clientRouter.post("*", (req, res) => {
    res.status(404).json({status:404, message:"Page not found error || 404 Error"});
});
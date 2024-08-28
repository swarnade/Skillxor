const express = require("express");
require('dotenv').config()
const freelancer = express.Router();
module.exports = freelancer;

const { MongoClient, ServerApiVersion } = require("mongodb");
const url = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@${process.env.MONGO_SERVER}/?retryWrites=true&w=majority&appName=SSP`;
const mongodb = new MongoClient(url);

//Server Route
freelancer.get("/", (req, res) => {
  res.status(200).json({
    status: "200",
    description: "success",
    route: "Freelancer Profile",
  });
});

//All Freelancer Profile
freelancer.get("/allprofile", (req, res) => {
  async function main() {
    try {
      await mongodb.connect();
      const database = mongodb.db("SIH2024");
      const collection = database.collection("freelancer");
      const output = await collection.find({}).toArray();
      res.status(200).json({ status: 200, profile: output });
    } catch {
      res.status(404).json({ status: 404, profile: "Error" });
    } finally {
      await mongodb.close();
    }
  }
  main().catch();
});

//Add Freelancer Profile
freelancer.post("/addprofile", (req, res) => {
  const { username, name, country, bio, portfolio, email, phone, linkedin } =
    req.body;

  async function main() {
    try {
      await mongodb.connect();
      const database = mongodb.db("SIH2024");
      const collection = database.collection("freelancer");
      const output = await collection.insertOne({
        _id: username,
        name: name,
        country: country,
        bio: bio,
        portfolio: portfolio,
        email: email,
        phone: phone,
        linkedin: linkedin,
      });
      res.status(200).json({ status: "200", user: username });
    } catch {
      res.status(404).json({ status: "404", user: "User Exists" });
    } finally {
      await mongodb.close();
    }
  }
  main().catch();
});

const express = require("express");
require('dotenv').config()
const freelancer = express.Router();
module.exports = freelancer;
const ValidMail = require("../Short_Hand/ValidMail");
const ValidPassword = require("../Short_Hand/ValidPassword");
const ValidMobile = require("../Short_Hand/ValidMobile");

const Freelancers = require("../Models");
//Server Route
freelancer.get("/", (req, res) => {
  res.status(200).json({
    status: "200",
    description: "success",
    route: "Freelancer Profile",
  });
});

// Other Modificiations will be made tomorrow

//All Freelancer Profile
// freelancer.get("/allprofile", (req, res) => {
//   async function main() {
//     try {
//       await mongodb.connect();
//       const database = mongodb.db("SIH2024");
//       const collection = database.collection("freelancer");
//       const output = await collection.find({}).toArray();
//       res.status(200).json({ status: 200, profile: output });
//     } catch {
//       res.status(404).json({ status: 404, profile: "Error" });
//     } finally {
//       await mongodb.close();
//     }
//   }
//   main().catch();
// });

//Add Freelancer Profile
// freelancer.post("/addprofile", (req, res) => {
//   const { username, name, country, bio, portfolio, email, phone, linkedin } =
//     req.body;

//   async function main() {
//     try {
//       await mongodb.connect();
//       const database = mongodb.db("SIH2024");
//       const collection = database.collection("freelancer");
//       const output = await collection.insertOne({
//         _id: username,
//         name: name,
//         country: country,
//         bio: bio,
//         portfolio: portfolio,
//         email: email,
//         phone: phone,
//         linkedin: linkedin,
//       });
//       res.status(200).json({ status: "200", user: username });
//     } catch {
//       res.status(404).json({ status: "404", user: "User Exists" });
//     } finally {
//       await mongodb.close();
//     }
//   }
//   main().catch();
// });









//Freelancer Login
freelancer.post("/signup", async (req, res) => {


  function ValidationCheck(body) {
    if(body.Name == "" || body.Name.length < 3){
      return "Enter a valid name";
    }
    if(!ValidMobile(body.mobileNumber)){
      return "Confirm Password must be at least 8 characters long, and include at least one lowercase letter, one uppercase letter, one digit, and one symbol.";
    }
    if(!ValidMail(body.Email)){
      return "Enter a valid email";
    }
    if(!ValidPassword(body.createPassword)){
      return "Create Password must be at least 8 characters long, and include at least one lowercase letter, one uppercase letter, one digit, and one symbol.";
    }
    if(!ValidPassword(body.confirmPassword)){
      return "Confirm Password must be at least 8 characters long, and include at least one lowercase letter, one uppercase letter, one digit, and one symbol.";
    }
    if(body.createPassword !== body.confirmPassword){
      return "Password does not match";
    }
    return "Valid";
  }
  async function main(){
    try{
      let Validation = ValidationCheck(req.body);

      if (Validation === "Valid") { 

        // Saving to database will be done tomorrow
        res.status(200).json({status:200, success:true, message:"Account successfully created."});

      }else{
        res.status(200).json({status:200, success:false, message:Validation});
      }
    }catch{
      res.status(500).json({status:500, success:false, message:"Unable to create account, try again later."});
    }finally{
     await mongodb.close();
   }; 
  }
  main().catch();
});

const express = require("express");
require('dotenv').config()
const freelancer = express.Router();
module.exports = freelancer;
const ValidMail = require("../Short_Hand/ValidMail");
const ValidPassword = require("../Short_Hand/ValidPassword");
const ValidMobile = require("../Short_Hand/ValidMobile");
const Profile_ID = require("../Short_Hand/Profile_ID");
const {hashPassword, verifyPassword} = require("../Short_Hand/Password");

const {Freelancers} = require("../Models");

//Server Route
freelancer.get("/", (req, res) => {
  res.status(200).json({
    status: "200",
    description: "success",
    route: "Freelancer Profile",
  });
});




//Freelancer Login
freelancer.post("/signup", async (req, res) => {


  function ValidationCheck(body) {
    if(body.Name == "" || body.Name.length < 3 || body.Name == undefined){
      return "Enter a valid name";
    }
    if(body.Mobile_Number == undefined || !ValidMobile(body.Mobile_Number) ){
      return "Enter a valid mobile number";
    }
    if(body.Email == undefined || !ValidMail(body.Email) ){
      return "Enter a valid email";
    }
    if(body.Create_Password == undefined || !ValidPassword(body.Create_Password) ){
      return "Create Password must be at least 8 characters long, and include at least one lowercase letter, one uppercase letter, one digit, and one symbol.";
    }
    if(body.Confirm_Password == undefined || !ValidPassword(body.Confirm_Password) ){
      return "Confirm Password must be at least 8 characters long, and include at least one lowercase letter, one uppercase letter, one digit, and one symbol.";
    }
    if(body.Create_Password !== body.Confirm_Password){
      return "Password does not match";
    }
    return "Valid";
  }


  
  async function main(){
    try{
      let Validation = ValidationCheck(req.body);

      if (Validation === "Valid") {

        let ID;

        while (true) {
          ID = Profile_ID();
          const FreelancersData = await Freelancers.findOne({_id:ID});
          if (FreelancersData == null) {
            break;
          };          
        }

        const FreelancersData = await Freelancers.findOne({Email:req.body.Email});

        if (FreelancersData == null) {
          
          const Pass = await hashPassword(req.body.Create_Password);
          
          const DataInsert = {
            _id: ID,
            Name: req.body.Name,
            Mobile_Number: req.body.Mobile_Number,
            Email: req.body.Email,
            Password: Pass,
          };
            
          const DataSave = Freelancers(DataInsert);
          await DataSave.save().then(() => {
            res.status(200).json({status:200, success:true, message:"Account successfully created."});
          }).catch(()=>{
            res.status(200).json({status:500, success:true, message:"Unable to create account, try again later."});
          });
        }else{
          res.status(401).json({status:401, success:true, message:"Already have an account with this email."});
        }
      }else{
        res.status(200).json({status:200, success:false, message:Validation});
      }
    }catch {
      res.status(500).json({status:500, success:false, message:"Unable to create account, try again later."});
    };
  }

  main().catch();
});

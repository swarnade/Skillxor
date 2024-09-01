const express = require("express");
require('dotenv').config()
const freelancer = express.Router();
module.exports = freelancer;
const ValidMail = require("../Short_Hand/ValidMail");
const Generate_Token = require("../Short_Hand/Random_Token");
const ValidPassword = require("../Short_Hand/ValidPassword");
const ValidMobile = require("../Short_Hand/ValidMobile");
const Profile_ID = require("../Short_Hand/Profile_ID");

const {hashPassword, verifyPassword} = require("../Short_Hand/Password");
const { createToken } = require("../Short_Hand/JWT");
const { Freelancers, Clients } = require("../Models");

//Server Route
freelancer.get("/", (req, res) => {
  res.status(200).json({
    status: "200",
    description: "success",
    route: "Freelancer Profile",
  });
});












//Freelancer Signup
freelancer.post("/signup", async (req, res) => {

  //Vadidation Check Function
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


  //Main Function call f
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
        const ClientsData = await Clients.findOne({Email:req.body.Email});

        if (!FreelancersData && !ClientsData) {
          
          const Pass = await hashPassword(req.body.Create_Password);
          
          const DataInsert = {
            _id: ID,
            Username:ID,
            Name: req.body.Name,
            Mobile_Number: req.body.Mobile_Number,
            Email: req.body.Email,
            Password: Pass,
            Log:"",
          };
            
          const DataSave = Freelancers(DataInsert);
          await DataSave.save().then(() => {
            res.status(200).json({status:200, success:true, message:"Account successfully created."});
          }).catch(()=>{
            res.status(500).json({status:500, success:false, message:"Unable to create account, try again later."});
          });
        }else{
          res.status(404).json({status:404, success:false, message:"Already have an account with this email, either client side or freelancer side."});
        }
      }else{
        res.status(404).json({status:404, success:false, message:Validation});
      }
    }catch {
      res.status(500).json({status:500, success:false, message:"Unable to create account, try again later."});
    };
  }

  main().catch();
});













//Freelancer Login
freelancer.post("/login", async (req, res) => {


  function ValidationCheck(body) {
    
    if(body.Email == undefined || !ValidMail(body.Email) ){
      return "Enter a valid email";
    }
    if(body.Password == undefined || !ValidPassword(body.Password) ){
      return "Password must be at least 8 characters long, and include at least one lowercase letter, one uppercase letter, one digit, and one symbol.";
    }
    return "Valid";
  }


  async function main(){
    try{
      let Validation = ValidationCheck(req.body);
      if (Validation === "Valid") {
        const FreelancersData = await Freelancers.findOne({Email:req.body.Email});
        if (FreelancersData) {
          if (verifyPassword(req.body.Password, FreelancersData.Password)) {
            const Log_Token = Generate_Token();
            await Freelancers.updateOne({_id:FreelancersData._id}, {Log:Log_Token}).then(()=>{
              res.status(200).json({
                status:200, 
                success:true, 
                message:"Login successful.", 
                Token: createToken({profileID: FreelancersData._id,Log: Log_Token})
              });
            }).catch(()=>{
              res.status(500).json({status:500, success:false, message:"Unable to login, try again later."});
            });
          }else{
            res.status(404).json({status:404, success:false, message:"Wrong password."});
          }
        }else{
          res.status(404).json({status:404, success:false, message:"You don't have an account with this email."});
        }
      }else{
        res.status(404).json({status:404, success:false, message: Validation});
      }
    }catch {
      res.status(500).json({status:500, success:false, message:"Unable to login, try again later."});
    };
  }

  main().catch();
});


//Freelancer All Profile
freelancer.get('/allprofiles',async(req,res)=>{
  async function main()
  {
    try
    {
      const data=await Freelancers.find({})
      res.status(200).json({status:"Success",profile:data})
    }
    catch
    {
      res.status(404).json({status:"Failed",profile:null})
    }
  } 
  main().catch()
})


// specific freelancer profile
freelancer.post('/profile/:username',async(req,res)=>{
  async function main()
  {
    try
    {
      const Profile_Of = req.params.username;
      const data = await Freelancers.findOne({Username:Profile_Of});
      if (data) {

        res.status(200).json({status:"Success",Profile:data})
        
      }else{
        
        res.status(404).json({status:"Failed",Profile:null})
      }

    }
    catch
    {
      res.status(404).json({status:"Failed",Profile:null})
    }
  } 
  main().catch()
})

freelancer.get("*", (req, res) => {
  res.status(404).json({status:404, message:"Page not found error || 404 Error"});
});
freelancer.post("*", (req, res) => {
  res.status(404).json({status:404, message:"Page not found error || 404 Error"});
});
const express = require("express");
const path = require("path");
const fs = require("fs");
const multer = require("multer");
require('dotenv').config()
const freelancer = express.Router();
module.exports = freelancer;
const ValidMail = require("../Short_Hand/ValidMail");
const Generate_Token = require("../Short_Hand/Random_Token");
const ValidPassword = require("../Short_Hand/ValidPassword");
const ValidMobile = require("../Short_Hand/ValidMobile");
const Profile_ID = require("../Short_Hand/Profile_ID");
const Auth = require("./Freelancer/freelancerAuthentication");

const { hashPassword, verifyPassword } = require("../Short_Hand/Password");
const { createToken } = require("../Short_Hand/JWT");
const { Freelancers } = require("../Models");

//Server Route
freelancer.get("/", (req, res) => {
  res.status(200).json({
    status: "200",
    description: "success",
    route: "Freelancer Profile",
  });
});

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
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

        if (!FreelancersData) {
          
          const Pass = await hashPassword(req.body.Create_Password);
          
          const DataInsert = {
            _id: ID,
            Username:ID,
            Name: req.body.Name,
            Mobile_Number: req.body.Mobile_Number,
            Email: req.body.Email,
            Password: Pass,
            Log:"",
            Country:"India",
            Bio:"",
            createdAt:Date(),
            Skills:[],
            About:{},
            Rating:"no rating",
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


// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
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
              res.status(500).json({status:500, success:false, message:"Unable to login, try again later.1"});
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
      res.status(500).json({status:500, success:false, message:"Unable to login, try again later.2"});
    };
  }

  main().catch();
});


// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// Authorized access of account - Profile
freelancer.get('/profile',async(req,res)=>{
  async function main()
  {
    try {
      let User = await Auth(req.body.Token);
      if (User) {
        res.status(200).json({status:"Success",Profile:User})
      }else{
        res.status(404).json({status:"Failed",message:"You don't have the access, please login and try again.",Profile:null})
      };
    } catch {
      res.status(500).json({status:"Failed",Profile:null})
    };
  };
  main().catch()
})


// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// Authorized access of account - update profile 
freelancer.put('/profile/update',async(req,res)=>{
  async function main()
  {
    try
    {
      let User = await Auth(req.body.Token);
      if (User) {
        
        const {Name, Mobile_Number, Bio, Country, Username} = req.body;
        function ValidationCheck(Name, Mobile_Number , Bio, Country) {
          if(Name == "" || Name.length < 3 || Name == undefined){
            return "Enter a valid name";
          }
          if(Mobile_Number == undefined || !ValidMobile(Mobile_Number) ){
            return "Enter a valid mobile number";
          }
          if(Bio == undefined || Bio.length < 2){
            return "Enter atleast 2 words in bio";
          }
          if(Country == undefined || Country.length < 3 ){
            return "Enter a valid country";
          }
          return "Valid";
        }

        let AA = ValidationCheck(Name, Mobile_Number, Bio, Country);
        if (AA === "Valid") {
          
          

          if (User.Username == Username) {
              await Freelancers.updateOne(
                {
                  _id: User._id
                },
                {
                  $set:{
                    Name:Name, 
                    Mobile_Number:Mobile_Number,
                    Bio:Bio,
                    Country:Country,
                  }
                }
              ).then(()=>{
                res.status(200).json({status:"Success",message: "Updated successfully"});
              }).catch(()=>{
                res.status(404).json({status:"Failed",message: "Unable to update the profile, try again later."});
              });
          }else{
              const data1 = await Freelancers.findOne({Username:Username});
              if (!data1) {
                await Freelancers.updateOne({
                  _id: User._id
                },
                {
                  $set:{
                    Name:Name, 
                    Username:Username,
                    Mobile_Number:Mobile_Number,
                    Bio:Bio,
                    Country:Country,
                  }
                }
                ).then(()=>{
                  res.status(200).json({status:"Success",message: "Updated successfully"});
                }).catch(()=>{
                  res.status(404).json({status:"Failed",message: "Unable to update the profile, try again later."});
                });
              }else{
                res.status(404).json({status:"Failed",message: "Username already exist, try unique one."});
              }
            
          }
        }else{
          res.status(404).json({status:"Failed",message: AA});
        };
        
      }else{
        res.status(404).json({status:"Failed",message:"Please login and try again later."})
      }
    }
    catch (R)
    {
      res.status(404).json({status:"Failed",message:"Internal server error"});
    }
  } 
  main().catch()
})


// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// Add skills
freelancer.put('/profile/skills',async(req,res)=>{


  async function main(){
    try{
      let User = await Auth(req.body.Token);
      if (User) {
        if (req.body.Skills) {
          await Freelancers.updateOne(
            {
              _id: User._id
            },
            {
              $set:{
                Skills:req.body.Skills
              }
            }
          ).then(()=>{
            res.status(200).json({status:"Success",message:"Skills added successfully"});
          }).catch(()=>{
            res.status(500).json({status:"Failed",message:"Unable to add skills, try again later."});
          });
        }else{
          res.status(404).json({status:"Failed",message:"Please provide skills."});
        }
      }else{
        res.status(404).json({status:"Failed",message:"Please login and try again later."})
      }


    }catch{

      res.status(404).json({status:"Failed",message:"Internal server error"});

    }
  }
  main().catch();
});



// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// Get skills
freelancer.get('/profile/skills',async(req,res)=>{
  async function main()
  {
    try
    {
      let User = await Auth(req.body.Token);
      if (User) {
        res.status(200).json({status:"Success",Skills: User.Skills});
        
      }else{
        res.status(404).json({status:"Failed",message: "Please login and try again later."})
      }
    }
    catch (R)
    {
      res.status(404).json({status:"Failed",message:"Internal server error"});
    }
  } 
  main().catch()
})


// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// Change Password
freelancer.put('/profile/change_password', async(req,res)=>{
  async function main(){
    try{
      let User = await Auth(req.body.Token);
      if (User) {
        if (req.body.Old_Password && req.body.New_Password) {

          if (verifyPassword(req.body.Old_Password, User.Password)) {
            if (ValidPassword(req.body.New_Password)) {
              const Pass = await hashPassword(req.body.New_Password);
              await Freelancers.updateOne(
                {
                  _id: User._id
                },
                {
                  $set:{
                    Password: Pass
                  }
                }
              ).then(()=>{
                res.status(200).json({status:"Success",message:"Password changed successfully"});
              }).catch(()=>{
                res.status(500).json({status:"Failed",message:"Unable to change password, try again later."});
              });
            }else{
              res.status(404).json({status:"Failed",message:"Password must be at least 8 characters long, and include at least one lowercase letter, one uppercase letter, one digit, and one symbol."});
            }
          }else{
            res.status(404).json({status:"Failed",message:"Wrong old password."});
          }
        }else{
          res.status(404).json({status:"Failed",message:"Please provide old and new password."});
        }
      }else{
        res.status(404).json({status:"Failed",message:"Please login and try again later."})
      }
    }catch{
      res.status(404).json({status:"Failed",message:"Internal server error"});
    }
  }
  main().catch();
});

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// Upload Profile Picture


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, path.join(__dirname, '../Freelancer_Images'));
  },
  filename: (req, file, cb) => {
      const A = Date.now() + "_"  + file.fieldname + '_'  + file.originalname;
      cb(null,  A);
  }
});
const Photo_Upload = multer({ storage: storage });
const A = Photo_Upload.fields([
    { name: 'Picture', maxCount: 1 },
  ]);
freelancer.post('/profile/picture', A, async(req,res)=>{
  
  async function main() {
    async function Delete() {
      const filePath = path.join(__dirname, '../Freelancer_Images/', req.files.Picture[0].filename);
      fs.unlink(filePath, (err) => {});
    };
    // console.log(req.files.Picture);
    try{
      
      if(req.files.Picture){

        let User = await Auth(req.body.Token);
        if (User) {
          
          const File = req.files.Picture[0];
          const Size = 2 * 1024 * 1024;

            
            // console.log(req.files.Picture[0].filename);
            if (File.size < Size) {

              
              if(User.Profile_Picture == ""){
                await Freelancers.updateOne(
                  {
                    _id: User._id
                  },
                  {
                    $set:{
                      Profile_Picture: File.filename
                    }
                  }
                ).then(()=>{
                  res.status(200).json({status:"Success",message:"Image uploaded successfully"});
                }).catch(async()=>{
                  await Delete();
                  res.status(500).json({status:"Failed",message:"Unable to upload image, try again later."});
                });
                
              }else{
                
                const filePath = path.join(__dirname, '../Freelancer_Images/', User.Profile_Picture);
                await fs.unlink(filePath, (err) => {});
                await Freelancers.updateOne(
                  {
                    _id: User._id
                  },
                  {
                    $set:{
                      Profile_Picture: File.filename
                    }
                  }
                ).then(()=>{
                  res.status(200).json({status:"Success",message:"Image uploaded successfully"});
                }).catch(async()=>{
                  await Delete();
                  res.status(500).json({status:"Failed",message:"Unable to upload image, try again later."});
                });
                
                
              }
            }else{
              await Delete();
              res.status(404).json({status:"Failed",message:"Please provide image file less than 2MB."});
            }
          
        }else{
          await Delete();
          res.status(404).json({status:"Failed",message:"Please login and try again later."})

        }
      }else{
        // await Delete();
        res.status(404).json({status:"Failed",message:"Please provide image file."});
      }
    }catch{
      await Delete();
      res.status(404).json({status:"Failed",message:"Internal server error"});
    }    
  }
  main().catch();
});

// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------

freelancer.get("/profile/about/", async (req, res) => {

  async function main(){
    try{
      let User = await Auth(req.body.Token);
      if (User) {
        res.status(200).json({status:"Success",About: User.About});
      }else{
        res.status(404).json({status:"Failed",message:"Please login and try again later."})
      }
    }catch{
      res.status(500).json({status:"Failed",message:"Internal server error"});
    }
  };
  main().catch();

});

freelancer.post("/profile/about/", async (req, res) => {
  async function main(){
    try{
      let User = await Auth(req.body.Token);
      if (User) {
        if (req.body.About) {
          const Ab = req.body.About;
          // console.log(Ab);
          await Freelancers.updateOne(
            {
              _id: User._id
            },
            {
              $set:{
                About:Ab
              }
            }
          ).then(()=>{
            res.status(200).json({status:"Success",message:"About added successfully"});
          }).catch(()=>{
            res.status(500).json({status:"Failed",message:"Unable to add about, try again later."});
          });
        }else{
          res.status(404).json({status:"Failed",message:"Please provide about."});
        }
      }else{
        res.status(404).json({status:"Failed",message:"Please login and try again later."})
      }
    }catch{
      res.status(500).json({status:"Failed",message:"Internal server error"});
    }

    
  }
  main().catch();
});
// --------------------------------------------------------------------------------------
// --------------------------------------------------------------------------------------
// get all freelancers profile
freelancer.get("/allprofiles", async (req, res) => {
  async function main(){
    try{
      const data = await Freelancers.find({});
      res.status(200).json({status:"Success",profile:data});
    }catch{
      res.status(404).json({status:"Failed",profile:null});
    }
  };
  main().catch();
})
freelancer.get("*", (req, res) => {
  res.status(404).json({status:404, message:"Page not found error || 404 Error"});
});
freelancer.post("*", (req, res) => {
  res.status(404).json({status:404, message:"Page not found error || 404 Error"});
});
freelancer.put("*", (req, res) => {
  res.status(404).json({status:404, message:"Page not found error || 404 Error"});
});
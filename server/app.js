const express=require('express')
require('dotenv').config()
const app=express()
const port=process.env.PORT
const freelancer=require('./routes/freelancer')
const clientRouter=require("./routes/client_acc");
const projectsRouter=require("./routes/projects");


app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); // Allow all origins or specify your domain
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
    next();
});
app.use("/files", express.static("./Freelancer_Images"));
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/freelancer',freelancer)
app.use('/client', clientRouter);
app.use('/projects', projectsRouter);

app.get('/',(req,res)=>{
    res.status(404).json({status:"200",description:"success"})
});



app.listen(port,()=>{
    console.log("Server Is Running")
})
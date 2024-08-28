const express=require('express')
require('dotenv').config()
const app=express()
const port=process.env.PORT
const freelancer=require('./routes/freelancer')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use('/freelancer',freelancer)


app.get('/',(req,res)=>{
    res.status(200).json({status:"200",description:"success"})
})

app.listen(port,()=>{
    console.log("Server Is Running")
})
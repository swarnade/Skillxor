const express=require('express');
const os=require('os');
const ServerStatus=express.Router();
const Architecture=os.arch();
const CpuModel=os.cpus()[0].model;
const CpuSpeed=os.cpus()[0].speed/1000;
const TotalMemory=parseInt(os.totalmem()/1024/1024);
const FreeMemory=parseInt(os.freemem()/1024/1024);
const UsedMemory=TotalMemory-FreeMemory;
const Uptime=os.uptime();
const NetworkInterface=os.networkInterfaces()
ServerStatus.get('/',(req,res)=>{
    res.send({
        Architecture:Architecture,
        CpuModel:CpuModel,
        CpuSpeed:CpuSpeed,
        TotalMemory:TotalMemory,
        FreeMemory:FreeMemory,
        UsedMemory:UsedMemory,
        Uptime:Uptime,
        NetworkInterfaces:NetworkInterface
    });
})
module.exports=ServerStatus
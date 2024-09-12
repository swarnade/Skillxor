import React, { useEffect, useState } from 'react';
import axios from 'axios';
export default function Serverstatus() {
    const [systemStats,setsystemStats]=useState('');
    const [freelancer,setFreelancer]=useState('');
    const [employer,setEmployer]=useState('');
    useEffect(()=>{
        setInterval(()=>{
            axios.get('http://localhost:1234/serverstatus').then((response)=>{
                setsystemStats(response.data);
                console.log(response.data);
            });
            axios.get('http://localhost:1234/freelancer').then((response)=>{
                setFreelancer(response.data);
                console.log(response.data);
            });
            axios.get('http://localhost:1234/client').then((response)=>{
                setEmployer(response.data);
                console.log(response.data);
            });
        },5000)

    },[]);

  return (
    <>
    <div>{systemStats.UsedMemory}</div>
    <div>{freelancer.status}</div>
    <div>{employer.status}</div>
    </>
  )
}

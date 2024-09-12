import React,{useEffect, useState} from 'react'
import { useParams } from "react-router-dom";
import axios from 'axios';
export default function Profile() {
    const params = useParams();
    const [details, setDetails] = useState('');
    useEffect(()=>{
        axios.get(`http://localhost:1234/freelancer/profile/${params.username}`).then((response)=>{
            setDetails(response.data.profile[0])
        })
    })
  return (
    <>
    <div>{details.Name}</div>
    <div>{details.Email}</div>
    <div>{details.Mobile_Number}</div>
    </>
  )
}


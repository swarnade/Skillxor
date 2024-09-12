import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import AppliedDetails from './AppliedDetails';
export default function Applied() {
    const [key,setKey]=useState(useParams().id);
    const [details,setDetails]=useState([])
    const token = localStorage.getItem("token");
    useEffect(()=>{
   
        axios.get(`http://localhost:1234/projects/${key}`,{
          headers: {
            'Authorization': token
          }
        })
        .then(response => {
          setDetails(response.data.project.applications);
          console.log(response.data.project.applications);
        })
        .catch(error => {
          console.error('Error fetching projects:', error);
        });
      }, [token])
  return (
    <div>      {details.map((name, index) => (
        <AppliedDetails username={name.freelancer} key={index}/>
      ))}</div>
  )
}

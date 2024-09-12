import React,{useState,useEffect} from 'react'
import axios from 'axios';

export default function AppliedDetails({username}) {

    const [details, setDetails] = useState('');
    useEffect(()=>{
        axios.get(`http://localhost:1234/freelancer/profile/${username}`).then((response)=>{
          setDetails(response.data.profile);
        })

    })
  return (
<>
<div className='m-10'>
    {details.Mobile_Number}
</div>
</>
  )
}

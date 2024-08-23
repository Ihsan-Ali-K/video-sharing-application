import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'
import { useSelector } from 'react-redux'
const Subscriptions = () => {
    const [data,setData] = useState([])
     const {currentUser} = useSelector(state=>state.user)
    useEffect(()=>{
      
      const getVideos = async () =>{
        const res = await axios.get(`http://localhost:8800/api/video/subscribedvideos`,{
        withCredentials: true
        })
        console.log(res.data)
        setData(res.data)
      }
  
      getVideos()
  
    },[currentUser])
   
    return (
      <div className='px-20 mt-5 flex flex-wrap justify-center gap-5 '>
       {
        currentUser ?
        data.map((video, index)=>(
          
            <Card video={video} />
          )) 
        
        :
        "please log in"
       }
       {
        data.length === 0 && <h5 className=' text-2xl font-bold text-green-600  '  >no videos from subscriptions</h5>
       }
     
      </div>
    )
}

export default Subscriptions
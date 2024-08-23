import React, { useEffect, useState } from 'react'
import Card from './Card'
import axios from 'axios'

const VideoList = () => {
  const [data,setData] = useState([])

  useEffect(()=>{
    
    const getVideos = async() =>{
      const res = await axios.get("http://localhost:8800/api/video/getvideos")
      setData(res.data)
    }

    getVideos()

  },[data])
 
  return (
    <div className='px-20 mt-5 flex flex-wrap justify-center gap-5 '>
      {data.map((video, index)=>(
        
        <Card key={index} video={video} />
      )) 
    } 
   
    </div>
  )
}

export default VideoList
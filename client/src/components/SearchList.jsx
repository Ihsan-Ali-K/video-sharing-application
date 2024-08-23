import React, { useEffect, useState } from 'react'
import Card from './Card'
import { useLocation } from 'react-router-dom'
import axios from 'axios';

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};
const SearchList = () => {
  const [video, setVideo] = useState([])
  const query = useQuery();
  const searchTerms = query.get('query') || '';

  console.log(searchTerms);
  
   useEffect(()=>{

 if(searchTerms){
  const getVideos = async() =>{
    const res = await axios.get(`http://localhost:8800/api/video/searchvideos?q=${searchTerms}`)
    setVideo(res.data)
  }


  getVideos()
 }

  },[searchTerms])
   console.log(video)

  return (
    <div className='w-full flex px-32 bg-slate-100 '>
     {
      video?.map((item, index)=>(

        <Card key={index} video={item} />
      ))
     }


    </div>
  )
}

export default SearchList
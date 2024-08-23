import React from 'react'
import { BiSolidLike } from 'react-icons/bi'
import { FcLikePlaceholder } from 'react-icons/fc'
import { Link } from 'react-router-dom'

const Card = ({video}) => {
  return (
    <Link to={`/singlevideo/${video?._id}`}>
    <div className='h-[300px] w-[320px] shadow-lg  border  flex flex-col justify-between hover:cursor-pointer'>
        <img src={video?.imageUrl} alt='' className='w-full h-[200px]' />
       <div className='flex flex-col gap-2 p-2'>
       <h6>{video?.title}</h6>
        <div className='flex justify-between'>
        <p className=''>{video?.views} views.</p>
       <div className='flex'>
       <FcLikePlaceholder   size={25}/>  <p>{video?.likes.length}</p>
       </div>
        </div>
       </div>

    </div>
    </Link>
  )
}

export default Card
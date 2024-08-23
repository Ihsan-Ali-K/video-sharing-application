import axios from 'axios';
import { formatDistanceToNow } from 'date-fns'
import React, { useEffect, useState } from 'react'

const Comment = ({comment}) => {
  const [user, setUser] = useState(null)
  const timeAgo = formatDistanceToNow(new Date(comment.createdAt), {addSuffix: true});

  useEffect(()=>{
    const fetchUser = async() =>{
      try {
        const res = await axios.get(`http://localhost:8800/api/user/getuser/${comment.userId}`)
        setUser(res.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUser()
  },[comment])

  return (
    <div className='flex gap-5'>
    <img src='https://thumbs.dreamstime.com/b/young-black-man-17710830.jpg' className='h-[60px]  w-[60px] rounded-full' alt='' />
    <div className='grid gap-1' >
        <div className='flex gap-3'>
        <h4 className='text-red-500'>{user && user[0].username}</h4>
        <p>
         {timeAgo}
          </p>
        </div>
        <p>{comment.text}
        </p>
        </div>

    </div>
  )
}

export default Comment
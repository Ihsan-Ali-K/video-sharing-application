import React, { useEffect, useState } from 'react'
import Comment from './Comment'
import { GiPlayButton } from 'react-icons/gi'
import axios from 'axios'


const Comments = ({ comment, videoId }) => {

  const [text, setText] = useState("")
  const [comments, setComments] = useState(comment)

  useEffect(()=>{
    setComments(comment)

  },[comment])




  const handleSubmit = async () =>{
   try {
    const response = await axios.post("http://localhost:8800/api/comment/add",{
      videoId,
      text

    },
  {
    withCredentials: true
  }
  )
  if (response.status === 200) {
    const newComment = response.data
    setComments(prevComments => [newComment, ...prevComments])
    setText("") // Clear the textarea after submitting
  }
   } catch (error) {
    
   }
  }


  

  return (
    <div className='w-full p-5 grid gap-8'>
      <h4 className='font-bold'>Comments: {comments.length}</h4>
      <div className='relative flex w-full gap-5'>
        <img src='https://thumbs.dreamstime.com/b/young-black-man-17710830.jpg' className='h-[60px]  w-[60px] rounded-full' alt='' />
        <textarea className=" p-5 caret-blue-500 md:caret-indigo-500 w-full border border-neutral-700  " value={text} onChange={(e)=>{setText(e.target.value)}}>

        </textarea>
        <GiPlayButton className='absolute z-50 right-0 bottom-0 cursor-pointer hover:bg-slate-400 rounded ' onClick={handleSubmit} size={25}/>
      </div>
      <div className='border-b-2 border-b-red-600 h-auto'>
        <h4>Recent Comments</h4>
      </div>
      {comment && comments.map((comment, index) => (
        
        <Comment comment={comment} />
      ))}

    </div>
  )
}

export default Comments
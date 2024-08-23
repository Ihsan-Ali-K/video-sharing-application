import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useDispatch } from 'react-redux'
import { loginFailure, loginStart, loginSuccess } from '../redux/userSlice'

const Login = ({setShowLoginModal}) => {
  const [visible , setVisible] = useState(false)
  const[username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [response, setResponse ] = useState("")

  const dispatch = useDispatch()
  
  const handleLogin = async () =>{
    dispatch(loginStart())
    try {
      const res = await axios.post("http://localhost:8800/api/user/login",{
        username,
        password
      },
    {
      withCredentials: true
    })
      
      setResponse(res.data.message || res.data)
      setShowLoginModal(false)
      dispatch(loginSuccess(res.data))
      console.log(res.data)

    } catch (error) {
      console.error('Registration error:', error.message);
      dispatch(loginFailure())
      
    }
}


  useEffect(()=>{
      setVisible(true)
  },[])
  return (
    <div className={`fixed top-10 p-5 grid z-50 w-full max-w-[600px] bg-green-400 border-4 border-red-800 rounded-md transition-transform duration-500 ${visible ? "scale-100": "scale-90"} `}>
          <IoMdClose onClick={() => { setShowLoginModal(false) }} className='ml-auto cursor-pointer' size={20} />
         <div className='grid gap-5'>
         <h2 className='ml-auto mr-auto text-2xl text-white font-bold '>Log In</h2>
           
           <div className='grid'>
           <label className='mb-1 text-lg' >username</label>
           <input type=' text' className='h-12 p-3' value={username} onChange={(e)=>{setUsername(e.target.value)}} />
           </div>
           <div className='grid'>
           <label className='mb-1 text-lg' >password</label>
           <input type='password' className='h-12 p-3' value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
           </div>

           <div className='mt-2'>
           <button className='border  bg-green-700 p-3 shadow-lg text-white font-bold ' onClick={handleLogin}>Login</button>
           </div>
         
         </div>
                  

    </div>
  )
}

export default Login
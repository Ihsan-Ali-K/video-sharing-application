import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

const Register = ({setShowRegisterModal}) => {
    const [visible , setVisible] = useState(false)
    const[username, setUsername] = useState("")
    const[useremail, setUseremail] = useState("")
    const [password, setPassword] = useState("")
    const [response, setResponse ] = useState("")
    const navigate = useNavigate()

    const handleRegister = async () =>{

         
        try {
          const res = await axios.post("http://localhost:8800/api/user/adduser",{
            username,
            useremail,
            password
          })
          
          setResponse(res.data.message || res.data)
          setShowRegisterModal(false)

        } catch (error) {
          console.error('Registration error:', error.message);
          setResponse('May be the user name or email already exists');
        }
    }
  

    useEffect(()=>{
        setVisible(true)
    },[])
  
  return (
    <>
  
    <div className={`fixed top-10 p-5 grid z-50 w-full max-w-[600px] bg-green-400 border-4 border-red-800 rounded-md transition-transform duration-500 ${visible ? 'scale-100' : 'scale-90'} `}>
    <IoMdClose onClick={() => { setShowRegisterModal(false) }} className='ml-auto cursor-pointer' size={20} />
   <div className='grid gap-5'>
   <h2 className='ml-auto mr-auto text-2xl text-white font-bold '>Sign Up</h2>
     
     <div className='grid'>
     <label className='mb-1 text-lg'>username</label>
     <input type=' text' className='h-12 p-3' value={username} onChange={(e)=>{setUsername(e.target.value)}} />
     </div>
     <div className='grid'>
     <label className='mb-1 text-lg'>Email</label>
     <input type='email' className='h-12 p-3' value={useremail} onChange={(e)=>{setUseremail(e.target.value)}} />
     </div>
     <div className='grid'>
     <label className='mb-1 text-lg'>password</label>
     <input type='password' className='h-12 p-3' value={password} onChange={(e)=>{setPassword(e.target.value)}} />
     </div>

     <div className='mt-2'>
     <button className='border  bg-green-700 p-3 shadow-lg text-white font-bold ' onClick={handleRegister}>Register</button>
     </div>
     <div>
     <div>{response && <h2>{response}</h2>}</div>
     </div>
   
   </div>
            

</div>

 
   </>
  )
}

export default Register
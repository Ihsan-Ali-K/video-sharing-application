import React, { useState } from 'react'
import { FaSearch, FaUpload } from 'react-icons/fa'
import UploadModal from './UploadModal'
import Login from './Login'
import Register from './Register'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../redux/userSlice'
import { Link } from 'react-router-dom'


const Navbar = () => {
  const dispatch = useDispatch()
    const currentUser = useSelector(state => state.user.currentUser)
    const [searchTerms, setSearchTerms] = useState("")
    const [showModal, setShowModal] = useState(false)
    const [showLoginModal, setShowLoginModal] = useState(false)
    const [showRegisterModal, setShowRegisterModal] = useState(false)

    const searchUrl = `/searchlist?query=${encodeURIComponent(searchTerms)}`
    const handleLogout = () =>{
       dispatch(logout())
    }


    return (
        <>
            <div className='relative  w-full h-full flex justify-center items-center'>
                {
                    showModal && <UploadModal setShowModal={setShowModal} />
                }
            </div>
            <div className='relative  w-full h-full flex justify-center '>
                {
                    showLoginModal && <Login setShowLoginModal={setShowLoginModal} />
                }
            </div>
            <div className='relative  w-full h-full flex justify-center '>
                {
                    showRegisterModal && <Register setShowRegisterModal={setShowRegisterModal} />
                }
            </div>


            <div className='w-full  h-[100px] md:px-20 bg-white flex md:gap-10  items-center '>
                <div className="logo h-[60px] w-[60px]">
                    <img src='https://circlevideo.azyrustemplates.com/images/logo.svg' alt='logo' />
                </div>
                <div className="links flex gap-2 ">
                    <Link to="/">Home</Link>
                    <Link to='/subscriptions'>Subscriptions</Link>
                    <Link to='/'>Trending</Link>
                </div>
                <div className="relative input flex grow max-w-[600px]">
                    <input type='text' alt='text' placeholder='search ' className='bg-slate-300 flex grow h-[50px] rounded-3xl outline-none p-5' value={searchTerms} onChange={(e)=>{setSearchTerms(e.target.value)}} />
                   <Link 
                       to={searchUrl}
                   
                    > <FaSearch className='absolute right-3 top-4 cursor-pointer  ' color='red' size={20}  /></Link>
                </div>
                <div className="user flex items-center gap-5  ml-auto ">
                    {currentUser ?
                        <>
                            <div className='group cursor-pointer h-[45px] w-[45px] rounded-full flex items-center   bg-green-400 hover:bg-white hover:border border-2 border-green-500 justify-center'>

                                <FaUpload size={15} className='text-white group-hover:text-green-400 ' onClick={() => { setShowModal(true) }} />

                            </div>
                            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvi7HpQ-_PMSMOFrj1hwjp6LDcI-jm3Ro0Xw&s" className='h-[60px] border  w-[60px] rounded-full' alt='' />
                            <h5>{currentUser.username}</h5>
                            <button className="login border px-3 py-1 border-red-700" onClick={handleLogout}>Log Out</button>
                        </>

                        :
                        <>
                            <button className="login border px-3 py-1 border-red-700" onClick={() => { setShowRegisterModal(true) }}>Register </button>
                            <button className="login border px-3 py-1 border-red-700" onClick={() => { setShowLoginModal(true) }}>Log in</button>
                        </>
                    }

                </div>
            </div>
        </>
    )
}

export default Navbar
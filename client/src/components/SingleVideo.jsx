import React, { useEffect, useState } from 'react'
import { FaRegComment } from 'react-icons/fa'
import { FcLikePlaceholder } from 'react-icons/fc'
import Comments from './Comments'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { subscribe } from '../redux/userSlice'
import { CiHeart } from 'react-icons/ci'

const SingleVideo = () => {
    const { currentUser } = useSelector(state => state.user)
    const dispatch = useDispatch()
    const [video, setVideo] = useState(null)
    const [comments, setComments] = useState([])
    const [channel, setChannel] = useState(null)

    const [subresponse, setSubresponse] = useState(null)
    const { id } = useParams()
    const [showMessage, setShowMessage] = useState(false)
    const [viewIncremented, setViewIncremented] = useState(false)  


    useEffect(() => {
        const fetchVideo = async () => {
            try {
                const res = await axios.get(`http://localhost:8800/api/video/getvideo/${id}`)
                setVideo(res.data)
              
            } catch (error) {
                console.error("Error fetching video:", error)
            }
        }
        return ()=> fetchVideo()
    }, [])

    useEffect(() => {
        const fetchComments = async () => {
            try {

                const res = await axios.get(`http://localhost:8800/api/comment/getcomment/${id}`)

                setComments(res.data)

            } catch (error) {
                console.error("error while fetching comments", error)
            }
        }
        fetchComments()
    }, [id])

    //fetch user of the current video
    useEffect(() => {
        const fetchUser = async () => {
            if (video && video.userId) {
                try {
                    const response = await axios.get(`http://localhost:8800/api/user/getuser/${video.userId}`);
                    setChannel(response.data);
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }

        }
        fetchUser()

    }, [video, subresponse])


    const handleSubscribe = async () => {

        const res = await axios.post(`http://localhost:8800/api/sub/subscribe/${video.userId}`, {},
            {
                withCredentials: true
            }

        )

        setSubresponse(res.data)
        dispatch(subscribe(video.userId))
    }
    //handles response from clicking subscribe button
    useEffect(() => {
        if (subresponse) {
            setShowMessage(true)
            const timer = setTimeout(() => {
                setShowMessage(false)
                setSubresponse(null)
            }, 5000)
            return () => clearTimeout(timer)
        }
    }, [subresponse])

    const handleLike = async () => {
       
        try {
            const response = await axios.put(`http://localhost:8800/api/video/like/${video?._id}`, {},
                {
                    withCredentials: true
                })
            setVideo(prevVideo => ({
                ...prevVideo,
                likes: [...prevVideo.likes, currentUser?._id]
            }))
            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }
    const handleDislike = async () => {
        
        try {
            const response = await axios.put(`http://localhost:8800/api/video/dislike/${video?._id}`, {},
                {
                    withCredentials: true
                })

            setVideo(prevVideo => ({
                ...prevVideo,
                likes: prevVideo.likes.filter(userId => userId !== currentUser?._id)
            }))


            console.log(response.data)
        } catch (error) {
            console.log(error)
        }
    }

    //increment view count
    const incrementView = async () => {
        try {
            const response = await axios.put(`http://localhost:8800/api/video/view/${video._id}`);
            setViewIncremented(true); 
            setVideo(prevVideo => ({
                ...prevVideo,
                views: prevVideo.views + 1
            }));
            console.log(response.data)
        } catch (error) {
            console.error("Failed to increment view count:", error);
        }
    };
    const handlePlay = () => {
        if (!viewIncremented) {
            incrementView();
        }
    };


    if (!video) {
        return <div>Loading...</div>;
    }

    const isSubscribed = currentUser?.subscribedUsers?.includes(video?.userId);
    console.log("currentuser",currentUser?._id)
    console.log("channel", video?.userId)

    const isLiked = video?.likes?.includes(currentUser?._id)
    const isUser = currentUser._id === video?.userId
console.log("video rul", video?.videoUrl)
    return (
        <div className='w-full flex justify-center py-5'>
            <div className='w-full max-w-[1400px] px-20 grid  grid-cols-3 divide-x '>

                <div className='col-span-2 w-full '>
                <video className="w-full aspect-video" onPlay={handlePlay} controls>
                        <source src={video && video.videoUrl} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    
                    <div className=''>
                        <h4 className='py-4 text-2xl '>{video && video.title}</h4>
                    </div>
                    <div className="box border flex items-center h-[200px] w-full shadow-xl">
                        <div className='h-[100px] p-5 flex gap-5 w-full'>
                            <img src='https://thumbs.dreamstime.com/b/young-black-man-17710830.jpg' className='h-[60px]  w-[60px] rounded-full' alt='' />
                            <div className='grid gap-3'>
                                <h5>{channel && channel[0].username}</h5>
                                <div className='flex '>
                               {!isUser  ? <>   {isSubscribed ? <button className='rounded-none border bg-red-500 text-white px-2 py-1' disabled>Subscribed</button>
                                        :
                                        <button className='rounded-none border bg-red-500 text-white px-2 py-1' onClick={handleSubscribe}>Subscribe</button>
                                    }
                               
                                    <button className='rounded-none border  px-2 py-1' disabled>{channel && channel[0].subscribers}</button>
                                    </> :
                                    <>
                                      <button className='rounded-none border bg-red-500 text-white px-2 py-1' disabled>Subscribers</button>
                                      <button className='rounded-none border  px-2 py-1' disabled>{channel && channel[0].subscribers}</button>
                                    </>
                                    }
                                </div>
                                {showMessage && <p>{typeof subresponse === 'string' ? subresponse : ''}</p>}
                            </div>
                            <div className="views ml-auto grid gap-2 ">
                                <p>{video && video.views} views</p>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                    <div className="bg-blue-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                                <div className='flex gap-2'>
                                    {isLiked ?
                                        <>
                                        <FcLikePlaceholder size={25} onClick={handleDislike} className='cursor-pointer' />
                                        <p>{video?.likes.length}</p>
                                        </>
                                        :
                                        <>
                                            <CiHeart size={25} onClick={handleLike} className='cursor-pointer' />
                                            <p>{video?.likes.length}</p></>

                                    }

                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="description mt-2 p-5 grid gap-3">
                        <p><strong>Category:</strong> {video && video.category} </p>
                        <p>{video && video.description}</p>
                    </div>

                    <div className='w-full'>
                        <Comments comment={comments} videoId={id} />
                    </div>

                </div>
                <div className='col-span-1'>

                </div>

            </div>
        </div>
    )
}

export default SingleVideo
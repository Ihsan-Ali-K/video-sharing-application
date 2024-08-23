import React, { useEffect, useState } from 'react'
import { IoMdClose } from 'react-icons/io'
import Dropdown from './Dropdown'
import { IoCloudUploadSharp } from 'react-icons/io5'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import app from '../firebase';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const UploadModal = ({ setShowModal }) => {
    const [visible, setVisible] = useState(false);
    const [inputs, setInputs] = useState({})

    const [category, setCategory] = useState(null)
    const [image, setImage] = useState(undefined)
    const [video, setVideo] = useState(undefined)
    const [imagePer, setImagePer] = useState(0)
    const [videoPer, setVideoPer] = useState(0)

    const navigate = useNavigate()

    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const filename = new Date().getTime() + file.name
        const storageRef = ref(storage, filename);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === 'imageUrl' ? setImagePer(Math.round(progress)) : setVideoPer(Math.round(progress))
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => { },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {

                    setInputs((prev) => {
                        return { ...prev, [urlType]: downloadURL }
                    })
                });
            }
        )
    }

    useEffect(() => {
        video && uploadFile(video, "videoUrl")

    }, [video])
    useEffect(() => {
        image && uploadFile(image, "imageUrl")

    }, [image])

    useEffect(() => {
        setVisible(true);
    }, []);
    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
    };

    const handleChange = e => {
        setInputs(prev => {
            return { ...prev, [e.target.name]: e.target.value }
        })
    }
    const handleUpload = async e => {
        e.preventDefault()
        const res = await axios.post(`http://localhost:8800/api/video/addvideo`, {
            ...inputs, category
        },
            {
                withCredentials: true
           
            }
        )
        setShowModal(false)
        res.status === 200 && navigate('/')
    }


    return (
        <div className={`fixed top-10 grid z-50 w-full max-w-[600px] bg-green-400 border-4 border-red-800 rounded-md  transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'} `}   >
            <div className={` rounded-lg transition-transform duration-300 ${visible ? 'scale-100' : 'scale-90'}`}>

                <div className={`p-5 grid  `}>
                    <IoMdClose onClick={() => { setShowModal(false) }} className='ml-auto cursor-pointer' size={20} />
                    <h4 className='ml-auto mr-auto'> Upload a video </h4>
                    <label className='mb-1 text-lg' >Title</label>
                    <input type=' text' className='h-12 p-3' name='title' onChange={handleChange} />

                </div>
                <div className='px-5 pb-5 grid '>

                    <label className='mb-1 text-lg'>Category:</label>
                    <div>
                        <Dropdown onCategoryChange={handleCategoryChange} />
                    </div>
                    <label className='mb-1 text-lg'>Description:</label>

                    <textarea className="p-3 caret-blue-500 min-h-32 md:caret-indigo-500 w-full border border-neutral-700  " name='description' onChange={handleChange}></textarea>


                </div>
                {/* <div className='ml-auto mr-auto p-5 md:h-[100px] md:w-[100px] hover:bg-green-700 cursor-pointer bg-white group border rounded-full flex justify-center items-center'>
                 
                    <IoCloudUploadSharp size={50} className='group-hover:text-white text-green-500 animate-bounce  ' />
                    
                  
                </div> */}
                <div className='grid p-5 gap-2'>
                    {videoPer > 0 ? <div>{"uploading " + videoPer}</div> : <div>

                        <label>choose video</label>
                        <input type='file' accept='video/*' onChange={(e) => setVideo(e.target.files[0])} ></input>
                    </div>}
                    {imagePer > 0 ? (
                        <div>{"uploading" + imagePer}</div>
                    ) : (
                        <div>
                            <label>choose image</label>
                            <input type='file' accept='image/*' onChange={(e) => setImage(e.target.files[0])} ></input></div>
                    )}
                </div>

                <div className='ml-auto mr-auto p-5 md:h-[100px] md:w-[100px] hover:bg-green-700 cursor-pointer bg-white group border rounded-full flex justify-center items-center'>

                    <IoCloudUploadSharp size={50} onClick={handleUpload} className='group-hover:text-white text-green-500 animate-bounce  ' />


                </div>
            </div>

        </div>
    )
}

export default UploadModal
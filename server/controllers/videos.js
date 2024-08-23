
import Video from "../Models/Video.js"
import User from "../Models/User.js"

//create video
export const addVideo = async (req, res) =>{
     console.log(req.body)
    try {
        const newVideo = new Video({
            userId: req.user.id,
           ...req.body          

        })
        await newVideo.save()
        res.status(201).json(newVideo)
        
    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//get videos
export const getvideos = async (req, res) =>{
    try {
        const videos = await Video.find({})
        if(!videos) return res.json("no viddeos found")
            res.status(200).json(videos)
    } catch (error) {
        res.status(400).json({ message: error.message })
        
    }
}

//get video by id
export const getVideo = async (req, res) =>{
    try {
        const video = await Video.findById(req.params.id)
        if(!video) return res.json("video not found")
        res.status(200).json(video)
    } catch (error) {
        res.status(400).json({ message: error.message })
        
    }
}

//deleete a video
export const deleteVideo = async (req, res) =>{
   
        try {
        
            const video = await Video.findById(req.params.id)
            if(!video) return res.status(400).json("video not found")
            if(req.user.id === video.userId){
                await Video.findByIdAndDelete(req.params.id)
                res.status(200).json("video deleted successfully")
            }else{
                res.json("you can only delete your videos")
            }
        } catch (error) {
            res.status(400).json({message: error.message})
        }
}

//get videos by cateogry
export const videoByCategory = async (req, res) =>{
    const category = req.query.category;
    let videos;
    try {
        if(category && category !== "all"){
             videos = await Video.find({category: category})
        }else{
             videos = await Video.find()
        }
        res.status(200).json(videos)
        
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
}

//increment view count
export const incrementViewCount =async (req, res) =>{
    const videoId = req.params.id
    try {
        const video = await Video.findByIdAndUpdate(
            videoId,
            {$inc: {views: 1}},
            {new: true}
        )

        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        return res.status(200).json(video);
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });

    }
}

//get subscibed videos 
export const getSubscribedVideos = async (req, res) => {
    try {
        const user = await User.findById(req.user.id);  // req.user.id should be set by verifyToken middleware
        const subscribedUsers = user.subscribedUsers;

        const videos = await Video.find({ userId: { $in: subscribedUsers } });
        
        res.status(200).json(videos);
    } catch (error) {
        return res.status(500).json({ message: "An error occurred", error: error.message });
       
    }
};


//search videos 
export const searchVideos = async (req, res) =>{
    const query = req.query.q
    try {
        const videos = await Video.find({ title: { $regex: query, $options: "i" }})
        res.status(200).json(videos)
        
    } catch (error) {
        res.status(500).json({ message: "Error searching for videos", error });
    }
}
import Video from "../Models/Video.js"
//like a video
export const likeVideo = async (req, res) =>{
    const id = req.user.id
    const videoId = req.params.videoId
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {likes:id},
            $pull:{dislikes: id}
        })
        res.status(200).json("video liked")
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}

//dislike a video
export const dislikeVideo = async (req, res) =>{
    const id = req.user.id;
    const videoId = req.params.videoId
    try {
        await Video.findByIdAndUpdate(videoId, {
            $addToSet: {dislikes: id},
            $pull: {likes: id},
        })
        res.status(200).json("video disliked")
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
}
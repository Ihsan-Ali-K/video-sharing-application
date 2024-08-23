import Comment from "../Models/Comment.js"

//add comment
export const addComment = async (req, res) =>{
  const newComment = new Comment({...req.body, userId : req.user.id})
  try {
    const savedComment = await newComment.save()
    res.status(200).json(savedComment)
  } catch (error) {
    res.status(400).json({message: error.message})
  }
}

//get comment 
export const getComment = async (req, res) =>{
  const videoId = req.params.videoId
  console.log(videoId)
  try {
    const comments = await Comment.find({videoId: videoId})
    if(!comments) return res.status("no comments found")
      res.status(200).json(comments)
  } catch (error) {
    res.status(400).json({message: error.message})
    
  }
}
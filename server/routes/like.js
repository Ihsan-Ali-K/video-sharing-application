import express from "express"
import { verifyToken } from "../jsonwebtoken.js"
import { dislikeVideo, likeVideo } from "../controllers/likes.js"

const router = express.Router()

router.put("/like/:videoId", verifyToken, likeVideo)
router.put("/dislike/:videoId", verifyToken, dislikeVideo)



export default router
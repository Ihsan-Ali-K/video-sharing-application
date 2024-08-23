import express from "express"
import {verifyToken} from "../jsonwebtoken.js"
import { addComment, getComment } from "../controllers/comments.js"
const router = express.Router()

router.post("/add", verifyToken, addComment )
router.get("/getcomment/:videoId", getComment )

export default router
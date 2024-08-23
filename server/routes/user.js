import express from "express"
import { addUser, getUser, loginUser } from "../controllers/users.js"

const router = express.Router()

router.post("/adduser", addUser)
router.post("/login", loginUser )
router.get("/getuser/:userId", getUser )


export default router
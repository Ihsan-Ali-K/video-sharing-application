import express from "express"
import { addVideo, deleteVideo, getSubscribedVideos, getVideo, getvideos, incrementViewCount, searchVideos, videoByCategory } from "../controllers/videos.js";
import { verifyToken } from "../jsonwebtoken.js";

const router = express.Router();


router.post("/addvideo",verifyToken, addVideo)
router.get("/getvideos", getvideos)
router.get("/getvideo/:id", getVideo)
router.get("/bycategory", videoByCategory )
router.delete("/delete/:id", verifyToken, deleteVideo )
router.put("/view/:id", incrementViewCount );

router.get("/subscribedvideos", verifyToken, getSubscribedVideos );
router.get('/searchvideos', searchVideos)


export default router
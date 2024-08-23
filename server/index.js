import express from "express"
import mongoose from "mongoose";
import videoRoutes from "./routes/video.js"
import userRoutes from "./routes/user.js"
import cookieParser from "cookie-parser";
import subscriptionRoutes from "./routes/subscritption.js"
import likeRoutes from "./routes/like.js"
import commentRoutes from "./routes/comment.js"
import cors from "cors"

const app = express()
const port = 8800;

const connect = () => {
    mongoose.connect("mongodb+srv://ihsanalikhan339:blogs@cluster0.xm5lppf.mongodb.net/videoshare")
        .then(() => {
            console.log("mongo db connected")
        }).catch((error) => {
            throw error
        })
}
const corsOptions = {
    origin: "http://localhost:5173", // Allow requests from this origin
    credentials: true, // Enable cookies from the frontend to pass through CORS
};
app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use("/api/video", videoRoutes)
app.use("/api/user", userRoutes)
app.use("/api/sub", subscriptionRoutes)
app.use("/api/video", likeRoutes)
app.use("/api/comment", commentRoutes)




app.listen(port, () => {
    console.log("server running on ", port)
    connect()
})

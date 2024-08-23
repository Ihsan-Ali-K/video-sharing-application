import mongoose from "mongoose";



const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    useremail: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    subscribers: {
        type: Number,
        default: 0
    },
    subscribedUsers:{
        type:[String]
    }
},
    {
        timestamps: true
    }
)


export default mongoose.model("User", userSchema)
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
    subscriberId: {
        type: String,
        required: true,

    },
    subscribedToId: {
        type: String,
        required: true
    },


},
    {
        timestamps: true
    }
)

export default mongoose.model("Subscription", subscriptionSchema)
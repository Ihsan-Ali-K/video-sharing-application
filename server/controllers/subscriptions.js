import Subscription from "../Models/Subscription.js"
import User from "../Models/User.js"
//create subscription
export const createSubscription = async (req, res) =>{
    console.log(req.user.id)
    console.log(req.params.userId)
   try {
         await User.findByIdAndUpdate(req.user.id, {
        $push:{subscribedUsers: req.params.userId}
       })
     const user = await User.findByIdAndUpdate(req.params.userId, {
        $inc: {subscribers: 1}
       })
       res.status(200).json(user)
   } catch (error) {
    res.status(400).json({message: error.message})
    
   }
}

//do unsubscribe
export const unsubscribe = async (req, res) =>{
    try {
        await User.findByIdAndUpdate(req.user.id, {
            $pull: { subscribedUsers: req.params.id}
        })
        await User.findByIdAndUpdate(req.params.id, {
            $inc: {subscribers: -1}
        })
        res.status(200).json("unsubscription successfull")
    } catch (error) {
        res.status(400).json({message: error.message})
        
    }
}

//get all subscriptions

export const getSubscriptions = async (req, res) =>{
    try {
        const subscriptions = await Subscription.find()
        if(!subscriptions) return res.status(404).json("no subscriptions found")
            res.status(200).json(subscriptions)
    } catch (error) {
        res.status(400).json({message: error.message})
    }
}
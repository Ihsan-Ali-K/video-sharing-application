import User from "../Models/User.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
//creating a user
export const addUser = async (req, res) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt .hashSync(req.body.password, salt);

        const newUser = new User({
            ...req.body, password: hash
        })
        await newUser.save()
        res.status(200).send("user has been created")

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//login a user
export const loginUser = async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ username })
        if (!user) return res.status(404).json("user not found")
        const isCorrect =  bcrypt.compareSync(req.body.password, user.password); // true
        if (!isCorrect) return res.json("wrong credentials")
            const {password, ...others} = user._doc;
        const token = jwt.sign({id:user._id}, "secretkey")
        res.cookie("access_token", token,{
            httpOnly: true
        }).status(200).json(others)

    } catch (error) {
        res.status(400).json({ message: error.message })
    }
}

//get a user 
export const getUser = async(req, res) =>{
    const userId = req.params.userId;
    try {
        const user = await User.find({_id: userId})
        if(!user) return res.status(404).json("user not found")
            res.status(200).json(user)
    } catch (error) {
        res.status(400).json({ message: error.message })
        
    }
}
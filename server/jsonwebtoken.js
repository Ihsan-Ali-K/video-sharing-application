import { compare } from "bcrypt";
import jwt from "jsonwebtoken"

export const verifyToken = (req, res, next) => {

    const token = req.cookies.access_token;
    if (!token) return res.json("you are not authenticated" )

    jwt.verify(token, 'secretkey', (err, user) => {
        if (err) return res.json("token is not valid")
        req.user = user;
        next()
    })

}

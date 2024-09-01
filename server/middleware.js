import jwt from "jsonwebtoken";
import { JWT_SECRET } from "./config.js";

export function authMiddleware (req, res, next) {
    const rawToken = req.headers.authorization;

    if (!rawToken || !rawToken.startsWith("Bearer ")) {
        return res.status(411).json({
            message:"Invalid token"
        })
    }
    
    const token = rawToken.split(" ")[1];

    try {
        const verified = jwt.verify(token,JWT_SECRET);
        if (verified.user_id) {
            req.user_id = verified.user_id;
        } else {
            return res.status(411).json({
                message:"Invalid token"
            })
        }
        
        next();

    } catch(err) {
        return res.status(411).json({
            message:"Invalid token"
        })
    }
}
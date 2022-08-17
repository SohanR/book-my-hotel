import { expressjwt } from "express-jwt";

export const requireSingin = expressjwt({
    secret: process.env.JWT_SECRET,
    algorithms:["HS256"]
})
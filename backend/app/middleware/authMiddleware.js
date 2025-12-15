const jwt = require("jsonwebtoken");
let express = require("express")

let authMiddleware= async(req,res,next)=>{
    try
    {
        const bearerHeader = req.headers['authorization']
        
        if (!bearerHeader) {
            return res.status(401).json({
                status: 0,
                message: "Access Denied. No Token Provided",
            });
        }
        const cryptoUser = jwt.verify(bearerHeader,process.env.SECRET_KEY_TOKEN)
        req.user = cryptoUser
        next()
    }catch(err)
    {
        res.status(401).json({
            status: 0,
            message: err.message,
        });
    }
}

module.exports = authMiddleware
let express = require("express")
const { user_Registeration, user_Login, userList, user_update, user_delete, user_ForgotPass, user_ResetPass} = require("../controllers/user.controllers")
const authMiddleware = require("../middleware/authMiddleware")
const userModel = require("../models/user.models")

const userRoute = express.Router()

userRoute.post("/user-login",user_Login)
userRoute.post("/user-registeration",user_Registeration)
userRoute.post("/user-forgotPass",user_ForgotPass)
userRoute.post("/user-ResetPass/:token",user_ResetPass)


userRoute.get("/user-list",userList)
userRoute.get("/user-list/:id",userList)

userRoute.put("/user-update/:id",user_update)
userRoute.delete("/user-delete/:id",user_delete)

userRoute.get("/admin-dashboard",authMiddleware,async(req,res)=>{
    try
    {
        let userData =  await userModel.findById(req.user.id).select("-uPassword")
        res.status(201).json({
            status:1,
            data:userData
        })
    }catch(err)
    {
        res.status(500).json({
            status:0,
            message:err.message
        })
    }
})
userRoute.get("/user-dashboard",authMiddleware,async(req,res)=>{
    try
    {
        let userData = await userModel.findById(req.user.id).select("-uPassword")
       
        res.status(201).json({
            status:1,
            data:userData
        })
    }catch(err)
    {
        res.status(500).json({
            status:0,
            message:err.message
        })
    }
})

module.exports = userRoute
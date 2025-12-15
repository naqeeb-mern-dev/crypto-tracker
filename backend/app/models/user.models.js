const  mongoose = require("mongoose");

let userSchema = mongoose.Schema(
    {
        uFullName:{
            type:String,
            required:true,
            trim: true,
        },
        uEmail:{
            type:String,
            required:true,
            unique:true,
            lowercase:true
        },
        uPassword:{
            type:String,
            required:true
        },
        uStatus:{
            type:String,
            default:"Active"
        },
        role:{
            type:String,
            enum:["user","admin"],
            default:"user"
        },
        resetPasswordToken: String,
        resetPasswordExpires: Date,
    },
    { timestamps: true }
)
let userModel = mongoose.model("crypto_users",userSchema)
module.exports = userModel
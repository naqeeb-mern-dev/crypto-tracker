const userModel = require("../models/user.models")
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const sendEmail = require("../utils/sendEmail");

let user_Login=async(req,res)=>{
    try
    {
        let {uEmail,uPassword,uRole} = req.body 
        let userCheck = await userModel.findOne({ uEmail: uEmail, role: uRole }) 
        if(!userCheck)
        {
            return(
                res.status(401).json({
                status:0,
                message:"Invalid Email and Password"
                })
            )
        }
         
        let checkPass = await bcrypt.compare(uPassword,userCheck.uPassword)
        if (!checkPass) {
            return res.status(401).json({
                status: 0,
                message: "Invalid Email and Password"
            });
        }

        if (userCheck.uStatus !== "Active" && userCheck.role == "user") {
            return res.status(401).json({
                status: 0,
                message: "Contact the admin to activate your profile"
            });
        }
        if (userCheck.uStatus !== "Active" && userCheck.role == "admin") {
            return res.status(401).json({
                status: 0,
                message: "Contact the Super Admin to activate your profile"
            });
        }
        let token = jwt.sign(
            {
                id:userCheck._id,
                email:userCheck.uEmail,
                role:userCheck.role
            },
            process.env.SECRET_KEY_TOKEN,
            {expiresIn:"1h"}
        )
        res.status(200).json({
            status:1,
            message:"Login Successfull",
            token:token,
            userData:{
                id:userCheck._id,
                fullName:userCheck.uFullName,
                email:userCheck.uEmail,
                role:userCheck.role
            }
        })
    }catch(err)
    {
        res.status(500).json({
            status:0,
            message: err.message
        })
    }
}

let user_Registeration=async(req,res)=>{
    try
    {
        console.log("body",req.body)
        let {uFullName,uEmail,uPassword,role,uStatus} = req.body
        let checkUser = await userModel.findOne({uEmail : uEmail}) 
         console.log("checkUser",checkUser)
        if(checkUser)
        {
            return(
                res.status(401).json({
                status:0,
                message:"Try Different Email"
            })
            )
        }
        let hashPass = await bcrypt.hash(uPassword,10) 
        let userData = new userModel({
            uFullName,
            uEmail,
            uPassword:hashPass,
            role: role || "user",          // Default role
            uStatus: uStatus || "Active"
        }) 
 
        await userData.save()
        res.status(200).json({
            status:1,
            message:"Registeration Successfully"
        })    
    }catch(err)
    {
        res.status(500).json({
            status:0,
            message:err.message
        })
    }
}

let user_update = async (req, res) => {
  try {
    const { id } = req.params;
    const { uFullName, uEmail, uPassword, role, uStatus,newPassword } = req.body;
    console.log("newPassword: ",newPassword)
    // Find user
    let userCheck = await userModel.findById(id);
    if (!userCheck) {
      return res.status(404).json({
        status: 0,
        message: "User not found with that ID",
      });
    }
 

    // Prepare update data
    const userUpdateData = {
      uFullName,
      uEmail,
      role,
      uStatus
    };

    // If password is provided → hash it
    if (uPassword) {

        console.log("newPassword u: ",uPassword)
      const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(uPassword, salt);
      userUpdateData.uPassword = hashedPass;
    }
    
    if(newPassword)
    {
        console.log("newPassword c: ",newPassword)
        const salt = await bcrypt.genSalt(10);
      const hashedPass = await bcrypt.hash(newPassword, salt);
      userUpdateData.uPassword = hashedPass;
    }
    console.log("userUpdateData: ",userUpdateData)
    // Update user
    const updatedUser = await userModel.findByIdAndUpdate(
      id,
      userUpdateData,
      { new: true }
    );

    return res.status(200).json({
      status: 1,
      message: "User updated successfully",
      data: updatedUser
    });

  } catch (err) {

    return res.status(500).json({
      status: 0,
      message: "Server error while updating user"
    });
  }
};

let user_delete=async(req,res)=>{
    try
    {
        let id = req.params.id
        if(!id)
        {
            return( 
                res.status(401).json({
                    status:0,
                    message:"User Id Not FOund"
                })
            )
        }
        let userCheck = await userModel.findById(id)
        if(!userCheck)
        {
            return( 
                res.status(401).json({
                    status:0,
                    message:"That User Not Exist"
                })
            )            
        }
        let deleteUser = await userModel.deleteOne({_id:id})
        res.status(200).json({
            status:1,
            message:"User has beeen Deleted",
            deleteUser
        })
    }catch(err)
    {
        res.status(500).json({
            status:0,
            message:err.message
        })
    }
}

let userList=async(req,res)=>{
    try
    {
        let id = req.params.id
        if(id)
        {
            let sData = await userModel.find({_id:id})
          
            return(
                res.status(200).json({
                    status:1,
                    msg:"Specific User Data",
                    data:sData
                })
            )
        }else
        {
            let userData = await userModel.find()
            
            return(
                res.status(200).json({
                    status:1,
                    msg:"User List",
                    data:userData
                })  
            )
        }
    }catch(err)
    {
        res.status(500).json({
            status:0,
            msg:err.message
        })
    }
    
}

let user_ForgotPass= async(req,res)=>{
    try
    {
        let uEmail = req.body.uEmail

        let user = await userModel.findOne({uEmail:uEmail})
        if(!user)
        {
            return(
                res.status(401).json({
                    status:0,
                    message:"Your Email is not registered! Contact With Email"
                })
            )
        }

        const token = jwt.sign({_id:user._id},process.env.SECRET_KEY_TOKEN,{
            expiresIn:"15m"
        })
        user.resetPasswordToken = token
        user.resetPasswordExpires = Date.now() + 15 * 60 * 1000;
        await user.save();
        const resetURL = `${process.env.FRONTEND_URL}/reset-password/${token}`;

        await sendEmail(
        user.uEmail,
        "Reset Password",
        `Click this link to reset your password: ${resetURL}`
        );
        res.json({ status:1, message: "Password reset email sent!" });
    }catch(err)
    {
        res.status(500).json({
            status:0,
            err:err.message,
            message:"Contact Using Email"
        })
    }
}

let user_ResetPass= async(req,res)=>{
  try {
    const token = req.params.token;
    const { uPassword } = req.body;

    const decoded = jwt.verify(token, process.env.SECRET_KEY_TOKEN);
    
    const user = await userModel.findOne({
      _id: decoded._id,
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() },
    });
   
    if (!user)
      return res.status(400).json({ message: "Invalid or expired token" });

    const hashed = await bcrypt.hash(uPassword, 10);
  
    user.uPassword = hashed;

    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    res.json({status:1, message: "Password reset successful!" });
  } catch (error) {
    res.status(500).json({status:0, message: "Invalid or expired token" });
  } 
}
module.exports = {user_Login,user_Registeration,userList,user_update,user_delete,user_ForgotPass,user_ResetPass}
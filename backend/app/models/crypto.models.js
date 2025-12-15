const  mongoose = require("mongoose");

let cryptoWishList = new mongoose.Schema({
    userId:{
        type:String,
        required:true
    },
    coinId:{
        type:String,
        required:true
    }
})

let cryptoWishListModel = mongoose.model("crypto_wishList",cryptoWishList)
module.exports = cryptoWishListModel
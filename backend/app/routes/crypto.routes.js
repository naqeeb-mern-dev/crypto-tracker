let express = require("express")
const { crypto_list, crypto_highlights_update, crypto_highlights_List, cryptoIconList, crypto_highlights_user_delete, crypto_list_by_id } = require("../controllers/crypto.controller")

const cryptoRoute = express.Router()

cryptoRoute.get("/crypto-list",crypto_list)
cryptoRoute.get("/crypto-list-id/:id",crypto_list_by_id)

cryptoRoute.post("/crypto-highlights-update/:userId/:coinId",crypto_highlights_update)
cryptoRoute.get("/crypto-highlights-list/:id",crypto_highlights_List)
cryptoRoute.get("/crypto-icon-list",cryptoIconList)
cryptoRoute.get("/crypto-highlights-delete/:userId",crypto_highlights_user_delete)


module.exports =  cryptoRoute
let express = require("express")
var cors = require('cors')
const { default: mongoose } = require("mongoose")
const userRoute = require("./app/routes/user.routes")
const cryptoRoute = require("./app/routes/crypto.routes")
let app = express()
app.use(express.json())
app.use(cors())
require("dotenv").config()

app.use("/api/v1/user/",userRoute)
app.use("/api/v1/crypto-tracker/",cryptoRoute)

mongoose.connect(process.env.DBURL).then(()=>{
    console.log("Mongoose Connected")
    app.listen(process.env.PORT)
})
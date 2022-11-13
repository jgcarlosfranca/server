const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const authRoutes = require("./routes/AuthRoutes")
const cookieParser = require("cookie-parser")
const { SERVER_PORT } = require("../server/utils/constants")

const app = express()

mongoose.connect("mongodb://localhost:27017/DB_JWT", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => { console.log("DB connection Success!") })

app.use(cors({
    origin: ["http://localhost:3000"],
    method: ["GET", "POST"],
    credentials: true
}))

app.use(express.json())


app.use(cookieParser())

app.use("/", authRoutes)

app.listen(SERVER_PORT, () => {
    console.log(`Server UP na porta ${SERVER_PORT}`)
})
const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

const authRouter = require("./routes/auth")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", authRouter)   // login and signup


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
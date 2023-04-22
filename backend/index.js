const express = require("express")
const cors = require("cors")

const authRouter = require("./routes/auth")
const lh_query = require("./routes/lh_query")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api", authRouter)   // login and signup
app.use("/api", lh_query)   // login and signup


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
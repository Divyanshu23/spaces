const express = require("express")
const cors = require("cors")

const authRouter = require("./routes/auth")
const lhRouter = require("./routes/lhQuery")
const labRouter = require("./routes/labQuery")
const adminRouter = require("./routes/admin")
const userRouter = require("./routes/user")

const app = express()

app.use(express.json())
app.use(cors())

app.use("/api/auth", authRouter)   // Login and Signup
app.use("/api/lhc", lhRouter)      // Lecture Hall Queries
app.use("/api/lab", labRouter)     // Lab Queries
app.use("/api/user", userRouter)   // User Queries
app.use("/api/admin", adminRouter) // Admin Queries


app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`)
})
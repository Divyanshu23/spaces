const express = require("express")
// const {connectToDB, connection} = require('./db')
const authRouter = require("./routes/auth")
const queryRouter = require("./routes/lh_query")

const cors = require("cors")

// connectToDB()


const port = 3001
const app = express()
app.use(express.json())
app.use(cors())

console.log('Hello!!');
app.use("/api", authRouter)

app.use("/lh_query", queryRouter)


app.listen(port, () => {
    console.log(`App is up and running on http://localhost:${port}`)
})




 


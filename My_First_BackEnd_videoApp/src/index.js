import dotenv from "dotenv";
import connectDB from './db/index.js';
import app from './app.js'

dotenv.config({
    path: '../.env'
})

connectDB()
    .then(() => {
        app.listen(process.env.PORT || 8000, () => {
            console.log(`Mongo DB Connect to ${process.env.PORT}`)
        })
    }).catch((error) => {
        console.log("Mongo DB Not Connect to ", error)
    })
// console.log("Run Code")
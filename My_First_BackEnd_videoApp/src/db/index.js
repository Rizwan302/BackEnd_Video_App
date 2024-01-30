import mongoose from "mongoose";
// import DB_NAME  from "../constants.js";
// console.log(DB_NAME) 
// "mongodb+srv://rizwan:rizwan@cluster0.kvm3nbi.mongodb.net/youtubeApp"

const connectDB = async () => {
    try {
        const connection = await mongoose.connect(`${process.env.MONGODB_URL}/${process.env.DB_NAME}`);
        // console.log('Connect to Data Base ', {connection})
    } catch (error) {
        console.log("ErroR Connect in MongoDB: " ,error);
        process.exit(1)
    }
}

export default connectDB;
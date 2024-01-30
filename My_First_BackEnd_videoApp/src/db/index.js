import mongoose from "mongoose";



const connectDB = async () => {
    try {
        const connection = await mongoose.connect("mongodb+srv://rizwan:rizwan@cluster0.kvm3nbi.mongodb.net/youtubeApp");
        console.log(`Connect to Data Base ${connection}`)
    } catch (error) {
        console.log("ErroR Connect in MongoDB: " ,error);
        process.exit(1)
    }
}

export default connectDB;
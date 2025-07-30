import mongoose from "mongoose";
import colors from 'colors'

export const connectDB = async ()=> {
    try {
        const url = process.env.MONGO_URI
        const {connection} = await mongoose.connect(url);
        console.log(colors.cyan.bold('MongoDB is connected'));        
        
    } catch (error) {
        console.log(colors.bgRed.bold(error.message));
        process.exit(1)
    }
}
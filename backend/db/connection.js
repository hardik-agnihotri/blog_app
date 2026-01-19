import mongoose from "mongoose";


export const connection = async()=>{
    try {
        await mongoose.connect(process.env.mongo_uri);
        console.log("db connected successfully");
        // process.exit(1);
    } catch (error) {
        console.error("DB Failed to connect :",error);
    }
}
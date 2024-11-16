import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    thumbnail:{
        id: {
            type: String,  
        },
        url: {
            type: String,
        }
    }
},{timestamps:true})

export const Album = mongoose.model("Album",albumSchema)

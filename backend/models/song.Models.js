import mongoose from "mongoose";

const songSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  singer: {
    type: String,
    required: true,
  },
  thumbnail: {
   id:String,
   url:String
  },
  audio: {
    id: {
      type: String,

    },
    url: {
      type: String,
      
    }
  },
  album: {
    type: String,
    required: true,
  }
}, { timestamps: true });

export const Song = mongoose.model("Song", songSchema);

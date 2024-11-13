import TryCatch from "../utils/tryCatch.js";
import getdataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";
import { Album } from "../models/album.Models.js";
import { Song } from "../models/song.Models.js";

export const uploadSong = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(401).json({ message: "Unauthorized" });
  const { title, description } = req.body;
  const file = req.file;
  const fileUrl = getdataUrl(file);
  const cloudResponse = await cloudinary.v2.uploader.upload(fileUrl.content, {
    folder: "Album",
    resource_type: "auto",
  });
  await Album.create({
    title,
    description,
    thumbnail: {
      id: cloudResponse.public_id,
      url: cloudResponse.secure_url,
    },
  });
  res.json({ message: "Song uploaded successfully" });
});

export const getAlbum = TryCatch(async (req, res) => {
  const albums = await Album.find();
  res.json(albums);
});

export const createSong = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(401).json({ message: "Unauthorized" });
    
  const { title, description, singer, album } = req.body;
  
  if (!req.file) {
    return res.status(400).json({ message: "Please upload an audio file" });
  }

  const file = req.file;
  const fileUrl = getdataUrl(file);
  
  const cloudResponse = await cloudinary.v2.uploader.upload(fileUrl.content, {
    resource_type: "video",
    folder: "songs"
  });

  const song = await Song.create({
    title,
    description,
    singer,
    audio: {
      id: cloudResponse.public_id,
      url: cloudResponse.secure_url,
    },
    album,
  });

  res.status(201).json({ 
    message: "Song created successfully",
    song 
  });
});

export const addThumbnail = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(401).json({ message: "Unauthorized" });

  const file = req.file;
  const fileUrl = getdataUrl(file);
  const cloudResponse = await cloudinary.v2.uploader.upload(fileUrl.content);
  await Song.findByIdAndUpdate(
    req.params.id,  
    {
      thumbnail: {
        id: cloudResponse.public_id,
        url: cloudResponse.secure_url,
      },
    },
    { new: true }
  );
  res.json({ message: "Thumbnail added successfully" });
});

export const getSong = TryCatch(async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

export const getSongByAlbum = TryCatch(async (req, res) => {
  const album = await Song.findById(req.params.id);
  const songs = await Song.find({ album: req.params._id });
  res.json({album,songs});
});

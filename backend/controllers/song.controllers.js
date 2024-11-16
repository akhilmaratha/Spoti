import TryCatch from "../utils/tryCatch.js";
import getdataUrl from "../utils/urlGenerator.js";
import cloudinary from "cloudinary";
import { Album } from "../models/album.Models.js";
import { Song } from "../models/song.Models.js";

export const createAlbum = TryCatch(async (req, res) => {
  if (req.user.role !== "admin")
    return res.status(403).json({ message: "Unauthorized" });
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
  res.json({ message: "Album uploaded successfully" });
});

export const getAllAlbums = TryCatch(async (req, res) => {
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

  try {
    const cloudResponse = await cloudinary.v2.uploader.upload(fileUrl.content, {
      resource_type: "video",
      folder: "songs",
    });

    const song = await Song.create({
      title,
      description,
      singer,
      audio: {
        id: cloudResponse.public_id,
        url: cloudResponse.secure_url,
      },
      // thumbnail: {
      //   id: "default_thumbnail_id",
      //   url: "default_thumbnail_url"
      // },
      album,
    });

    res.status(201).json({
      success: true,
      message: "Song created successfully",
      song,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating song",
      error: error.message,
    });
  }
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

export const getAllSongs = TryCatch(async (req, res) => {
  const songs = await Song.find();
  res.json(songs);
});

export const getSongByAlbum = TryCatch(async (req, res) => {
  const album = await Album.findById(req.params.id);
  const songs = await Song.find({ album: req.params.id });
  res.json({ album, songs });
});

export const deleteSong = TryCatch(async (req, res) => {
  const song = await Song.findById(req.params.id);

  await song.deleteOne();

  res.json({ message: "Song Deleted" });
});

export const getSingleSong = TryCatch(async (req, res) => {
  const song = await Song.findById(req.params.id);
  res.json(song);
});

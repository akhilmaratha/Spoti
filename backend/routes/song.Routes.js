import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFile from "../middlewares/multer.js";
import { uploadSong,
    getAlbum, 
    getSong, 
    getSongByAlbum, 
    addThumbnail, 
    createSong } from "../controllers/song.controllers.js";
const router = express.Router();

router.post("/album/new",isAuth,uploadFile,uploadSong);
router.get("/album/all",isAuth,getAlbum);
router.post("/new",isAuth,uploadFile,createSong);
router.post("/:id",isAuth,uploadFile,addThumbnail);
router.get("/all",isAuth,getSong);
router.get("/album/:id",isAuth,getSongByAlbum);

export default router;

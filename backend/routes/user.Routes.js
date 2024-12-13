import express from "express";
const router = express.Router();
import {registerUser,loginUser,myProfile,logoutUser, saveToPlaylist} from "../controllers/user.controllers.js";
import {isAuth} from "../middlewares/isAuth.js"
//Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me",isAuth,myProfile)
router.get("/logout",isAuth,logoutUser)
router.post("/song/:id",isAuth,saveToPlaylist)
export default router;

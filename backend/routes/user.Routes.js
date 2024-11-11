import express from "express";
const router = express.Router();
import {registerUser,loginUser,myProfile,logoutUser} from "../controllers/user.controllers.js";
import {isAuth} from "../middlewares/isAuth.js"
//Routes
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me",isAuth,myProfile)
router.get("/logout",isAuth,logoutUser)

export default router;

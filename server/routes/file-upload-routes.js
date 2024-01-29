"use strict";
// import { getPhotos } from "../controllers/unsplash.mjs";

const express = require("express");
const multer = require("multer");
const authMiddleware = require("../middlewares/authMiddleware");
const { upload } = require("../helpers/filehelper");
const {
  singleFileUpload,
  multipleFileUpload,
  getallSingleFiles,
  getallMultipleFiles,
  getSearchedFiles,
  saveCanvas,
  retrieveCanvas,
  retrieveSavedCanvas,
  saveSelectedAnim,
  retrieveCanvasAnim,
  serveMainPage,
  serveTextJsonFile,
  serveTextJsonFile2,
  serveRegisterPage,
  registerUser,
  loginUser,
  getAnimations,
  uploadAnimation,
  bulkUploadAnimation,
  searchAnimation,
  searchImages
} = require("../controllers/fileuploaderController");

// const getPhotos = require("../controllers/unsplash.mjs");


const router = express.Router();

const storage = multer.memoryStorage();
const s3upload = multer({ storage: storage });

router.post("/uploadanim", s3upload.single("image"), uploadAnimation);
router.post("/bulkuploadanim", s3upload.array("images"), bulkUploadAnimation);
router.post("/singleFile", upload.single("file"), singleFileUpload);
router.post("/multipleFiles", upload.array("files"), multipleFileUpload);
// router.get("/main", serveMainPage);
// router.get("/register", serveRegisterPage);
// router.post("/register/user", registerUser);
router.get("/assets/anim/Text/TextComp2.json", serveTextJsonFile);
router.get("/assets/anim/Text/TextComp1.json", serveTextJsonFile2);

router.get("/getSingleFiles", getallSingleFiles);
router.get("/getMultipleFiles", getallMultipleFiles);
router.get("/getAnimations", getAnimations);
router.get("/getSearchedFiles", getSearchedFiles);
router.get("/getSearchedFiles", getSearchedFiles);

router.post("/search", searchAnimation);

router.post("/search-image", searchImages);

router.post("/saveSelectedAnim", saveSelectedAnim);
router.get("/retrieveCanvas", authMiddleware.protected_route, retrieveCanvas);
router.get("/retrieveSavedCanvas", retrieveSavedCanvas);
router.get("/retrieveCanvasAndAnim", retrieveCanvasAnim);
router.post("/saveCanvas", authMiddleware.protected_route, saveCanvas);

router.post("/register", registerUser);
router.post("/login", loginUser);
module.exports = {
  routes: router,
};

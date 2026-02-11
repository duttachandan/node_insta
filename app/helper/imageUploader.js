require("dotenv").config();
const multer = require("multer");

// CLOUDINAY Initiation
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
});

const MIME_TYPES = ["image/jpeg", "image/jpg", "image/avif", "image/png"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (MIME_TYPES.includes(file.mimetype)) {
      cb(null, "uploads/");
      // return new 
    } else {
      throw new Error("Wrong File Uploaded");
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const imageUploader = multer({ storage: storage });

module.exports = imageUploader;

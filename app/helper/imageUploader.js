require("dotenv").config();
const multer = require("multer");

// CLOUDINAY Initiation
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: `${process.env.CLOUDINARY_NAME}`,
  api_key: `${process.env.CLOUDINARY_KEY}`,
  api_secret: `${process.env.CLOUDINARY_SECRET}`,
});

const MIME_TYPES = ["jpeg", "jpg", "avif", "png"];

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "instagram-demo",
    allowed_format: MIME_TYPES,
    // format: async (req, file) => MIME_TYPES,
    public_id: (req, file) => {
      // console.log(file.originalname.split('.')[0]);
      return Date.now() + "-" + file.originalname?.split('.')[0];
    },
  },
});

const imageUploader = multer({ storage });

module.exports = imageUploader;

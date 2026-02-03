const multer = require("multer");

const MIME_TYPES = ["image/jpeg", "image/jpg", "image/avif", "image/png"];

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (MIME_TYPES.includes(file.mimetype)) {
      cb(null, "uploads/");
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

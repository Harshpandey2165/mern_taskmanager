const multer = require("multer");


// Configure Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Set the destination folder for uploaded files
  },
  filename: (req, file, cb) => {
    cb(null,`${Date.now()}-${file.originalname}` ); // Set the filename for uploaded files
  },
});

// File Filter
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = ["image/jpeg", "image/png", "image/gif"];
    if (allowedMimeTypes.includes(file.mimetype)) {
      cb(null, true); // Accept the file
    } else {
      cb(new Error("Invalid file type. Only JPEG, PNG, and GIF files are allowed."), false); // Reject the file
    }
  };

const upload = multer({storage, fileFilter});

module.exports = upload.single("image"); // "image" is the field name in the form where the file will be uploaded
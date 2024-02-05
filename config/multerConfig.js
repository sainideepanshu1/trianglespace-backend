const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const originalNameWithoutSpaces = file.originalname.replace(/\s/g, '_');
    const fileName = `${uniqueSuffix}-${originalNameWithoutSpaces}`;
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

module.exports = upload;

const multer = require("multer");
const path = require("path");

//mult config
module.exports = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("FILE type not supported"), false);
      return;
    }
    cb(null, true);
  },
});

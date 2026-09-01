import multer from "multer";
import fs from "fs";

if (!fs.existsSync("./public")) {
  fs.mkdirSync("./public", { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./public");
  },

  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const upload = multer({ storage });
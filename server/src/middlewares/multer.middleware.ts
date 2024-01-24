import multer from "multer";

const storage = multer.diskStorage({
  destination: (__, _, callback) => {
    console.log("inside dest");

    callback(null, "./public/temp");
  },
  filename: (__, file, callback) => {
    console.log("inside file");
    callback(null, file.originalname);
  },
});

export const uploadFile = multer({ storage });

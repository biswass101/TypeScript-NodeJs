import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config";
import multer from "multer";
import fs from "fs";

cloudinary.config({
  cloud_name: config.cloude_name,
  api_key: config.cloude_api_key,
  api_secret: config.cloude_api_secret,
});

export const sendFileToCloudinary = (fileName: string, path: string) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      path,
      { public_id: fileName },
      (error, result) => {
        if (error) reject(error);
        resolve(result);

        fs.unlink(path, (err) => {
          if (err) console.log(err);
          else console.log("File is Deleted!");
        });
      }
    );
  });
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });

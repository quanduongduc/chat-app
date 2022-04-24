const path = require("path");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const uploadConfig = {
  resource_type: "auto",
  public_id: "myfolder/mysubfolder/dog_closeup",
  chunk_size: 6000000,
  eager: [
    { width: 300, height: 300, crop: "pad", audio_codec: "none" },
    {
      width: 160,
      height: 100,
      crop: "crop",
      gravity: "south",
      audio_codec: "none",
    },
  ],
  eager_async: true,
  eager_notification_url: "https://mysite.example.com/notify_endpoint",
};

const upload = async (attractments) => {
  const uploads = attractments.map((attractment) => {
    const publicId =
      path.parse(attractment.originalname).name +
      "_" +
      ~~(Math.random() * 10000) +
      path.parse(attractment.originalname).ext;
    return cloudinary.uploader.upload(attractment.path, {
      public_id: publicId,
      resource_type: "auto",
      quality: "auto",
    });
  });
  const res = await Promise.all(uploads);
  return res;
};

module.exports = upload;

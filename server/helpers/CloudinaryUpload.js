const path = require("path");
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const upload = async (attachments) => {
  const mediaRegrex = /((image)|(video)).*/;
  const uploads = attachments.map((attachment) => {
    let public_id = "";
    if (mediaRegrex.test(attachment.mimetype)) {
      publicId =
        path.parse(attachment.originalname).name +
        "_" +
        ~~(Math.random() * 10000);
    } else {
      publicId =
        path.parse(attachment.originalname).name +
        "_" +
        ~~(Math.random() * 10000) +
        path.parse(attachment.originalname).ext;
    }
    return cloudinary.uploader.upload(attachment.path, {
      public_id: publicId,
      resource_type: "auto",
      quality: "auto",
    });
  });
  const res = await Promise.all(uploads);
  return res;
};

module.exports = upload;

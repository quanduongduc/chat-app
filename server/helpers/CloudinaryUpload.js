require("dotenv").config();
const cloudinary = require("cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const upload = async (attractments) => {
  console.log(attractments);
  const uploads = attractments.map((attractment) => {
    return cloudinary.uploader.upload(attractment);
  });
  const res = await Promise.all(uploads);
  console.log(res);
};

module.exports = upload;

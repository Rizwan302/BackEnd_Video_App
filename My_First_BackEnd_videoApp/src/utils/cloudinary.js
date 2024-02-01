import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});


const uploadFile = async (path) => {
  try {
    if(!path) return null;
    const response = await cloudinary.uploader.upload(path, { public_id: "olympic_flag" },
      function (error, result) {
        console.log(result);
      });
      console.log(response, ":: File Upload")
      return response
  } catch (error) {
    console.log(error);
    fs.unlinkSync(path)
  }
}
const cloudinary = require('cloudinary').v2;
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

//! cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

exports.addImage = async (req, res, next) => {
    try {
      if (!req.body.data || !req.body.data.base64Image) {
        throw new Error("Base64 image data is missing in the request.");
      }
  
      const result = await cloudinary.uploader.upload(req.body.data.base64Image, {
        public_id: uuidv4(),
      });
  
      if (!result || !result.url) {
        throw new Error("Failed to upload image to Cloudinary.");
      }
  
      console.log("Cloudinary upload result:", result);
  
      res.status(201).json({
        status: "success",
        statusCode: 201,
        data: result,
      });
    } catch (error) {
      console.error("Error in addImage:", error);
      next(error);
    }
  };
  

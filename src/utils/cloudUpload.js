const streamifier = require("streamifier");
const cloudinary = require("../utils/cloudinary");

const uploadBuffer = (buffer, folder, resorceType = "auto") => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resorceType,
      },

      (error, result) => {
        if (error) return reject(error);
        //resolve(result.secure_url, result.public_id);
        resolve(result);
      },
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};

module.exports = uploadBuffer;

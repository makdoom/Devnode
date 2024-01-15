import { v2 as cloudinary } from "cloudinary";
import fs from "fs";
import ApiError from "./ApiError";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

const configureCloudinary = async (): Promise<void> => {
  return new Promise((resolve, reject) => {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    if (
      cloudinary.config().cloud_name &&
      cloudinary.config().api_key &&
      cloudinary.config().api_secret
    ) {
      resolve();
    } else {
      reject(new ApiError(401, "Cloudinary configuration is not set properly"));
    }
  });
};

const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;

    await configureCloudinary();

    const uploadedFile = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });
    if (uploadedFile) {
      console.log(
        `File has been uploaded successfully on ⛅️ \nFile URL: ${uploadedFile.url}`
      );
    }

    // Unlink local files
    fs.unlinkSync(localFilePath);
    return uploadedFile;
  } catch (error) {
    console.log("error from cloudinary", error);
    // Remove file from local as the uploading got failed
    fs.unlinkSync(localFilePath);
    return null;
  }
};

const deleteOnCloudinary = async (filePublicId: string) => {
  try {
    if (!filePublicId) return null;

    await configureCloudinary();

    const uploadedFile = await cloudinary.uploader.destroy(filePublicId, {
      resource_type: "auto",
    });

    return uploadedFile;
  } catch (error) {
    throw new ApiError(500, "Error while removing old avatar file");
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };

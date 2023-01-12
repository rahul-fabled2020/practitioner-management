import Boom from "@hapi/boom";
import { v2 as cloudinary } from "cloudinary";
import { UploadedFile } from "express-fileupload";

export function uploadFile(file: UploadedFile) {
  try {
    return cloudinary.uploader.upload(file.tempFilePath);
  } catch (error: any) {
    console.log(error);
    throw Boom.boomify(error);
  }
}

export function handleSingleFileUpload(files: any) {
  const file: UploadedFile = Object.values(files)[0] as UploadedFile;

  return uploadFile(file);
}

export function handleMultipleFilesUpload(files: any) {
  return Promise.all(
    Object.values(files).map((file) => uploadFile(file as UploadedFile))
  );
}

export function destroyFile(publicId: string) {
  try {
    return cloudinary.uploader.destroy(publicId);
  } catch (error: any) {
    throw Boom.boomify(error);
  }
}

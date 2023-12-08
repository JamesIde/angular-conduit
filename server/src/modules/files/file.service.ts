import { HttpStatus } from "../../common/enum/status";
import AppError from "../../common/interface/AppError";
import cloudinary from "../../cloudinary/cloudinary";
import { UploadApiResponse } from "cloudinary";

export function uploadStreamAsync(buffer: Buffer): Promise<UploadApiResponse> {
  return new Promise((resolve) => {
    cloudinary.uploader
      .upload_stream(
        {
          resource_type: "image",
          format: "jpg", // Convert to JPG. Without it image file will have no extension in url
        },
        function onEnd(error, result) {
          if (error) {
            throw new AppError(
              "An error occured uploading image",
              HttpStatus.BAD_REQUEST
            );
          }
          resolve(result);
        }
      )
      .end(buffer);
  });
}

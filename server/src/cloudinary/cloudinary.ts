import { v2 as cloudinary } from "cloudinary";
import { ServerConfig } from "../config/server.config";

cloudinary.config(ServerConfig.CLOUDINARY_CONFIGURATION);

export default cloudinary;

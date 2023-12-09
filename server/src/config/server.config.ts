import dotenv from "dotenv";

dotenv.config();
export const ServerConfig = {
  DATABASE_URL: process.env.DATABASE_URL || "",
  PORT: process.env.PORT || 3000,
  RATE_LIMITER: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  },
  CLOUDINARY_CONFIGURATION: {
    cloud_name: process.env.CLOUDINARY_API_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  },
  JWT_SECRET: process.env.JWT_SECRET,

  CLIENT_URL: () => {
    return process.env.NODE_ENV === "production"
      ? process.env.PROD_CLIENT_URL
      : process.env.DEV_CLIENT_URL;
  },

  ROUTER_V1_PREFIX: (collection: string) => {
    return `/api/v1/${collection}`;
  },
};

export const ServerConstants = {
  REDIS: {
    KEY_NAME: "sessions",
    EXPIRATION_IN_SECONDS: 3600,
  },
  COOKIE: {
    KEY: "sid",
    CONFIG: {
      expires: new Date(Date.now() + 900000),
      httpOnly: true,
      secure: true,
    },
  },
};

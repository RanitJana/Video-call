const _env = {
  PORT: process.env.PORT,
  ORIGIN: process.env.ORIGIN,
  MONGODB_URI: process.env.MONGODB_URI,
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
};
const cookieOptions = {
  httpOnly: false,
  maxAge: 100000,
  secure: false,
};

Object.freeze(_env);

const MODEL_NAME = "video-app";

export { _env, MODEL_NAME, cookieOptions };

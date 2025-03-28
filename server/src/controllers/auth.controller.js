import axios from "axios";
import AsyncHandler from "../utils/AsyncHandler.js";
import userSchema from "../models/user.model.js";
import { cookieOptions } from "../constants.js";

const googleLogin = AsyncHandler(async (req, res) => {
  const { access_token } = req.body;

  if (!access_token)
    return res.status(400).json({
      success: false,
      message: "No access token is found",
    });
  const { data } = await axios.get(
    `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${access_token}`
  );

  if (!data)
    return res.status(500).json({
      success: false,
      message: "Please try again",
    });

  const { email, name, picture } = data;

  let user = await userSchema.findOne({ email });
  if (!user) user = await userSchema.create({ email, name, avatar: picture });
  return res
    .cookie("access_token", access_token, cookieOptions)
    .status(200)
    .json({
      success: true,
      message: "Logged in",
      user,
    });
});

export { googleLogin };

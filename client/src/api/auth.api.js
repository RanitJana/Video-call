import axios from "axios";

const handleLogin = async (body) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_BACKEND_URI}/api/v1/google`,
      body,
      {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      }
    );
    return response;
  } catch (error) {
    console.log(error);
    return error?.message;
  }
};

export { handleLogin };

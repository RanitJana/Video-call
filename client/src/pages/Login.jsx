import React from "react";
import GoogleLoginButton from "../components/GoogleLoginButton/GoogleLoginButton.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

function Login() {
  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLoginButton>
          <button
            className={`bg-blackDarkest transition-all w-fit flex items-center justify-center gap-2 px-4 py-2 rounded-md border-[1px] border-gray-400 hover:cursor-pointer`}
          >
            <img src="/images/google.png" alt="" className="w-6" />
            <span className="text-gray-700 text-sm font-bold">Google</span>
          </button>
        </GoogleLoginButton>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Login;

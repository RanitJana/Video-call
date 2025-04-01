import React, { useState } from "react";
import GoogleLoginButton from "../components/GoogleLoginButton/GoogleLoginButton.jsx";
import ButtonCustom from "../components/Button/ButtonCustom.jsx";
import { GoogleOAuthProvider } from "@react-oauth/google";

function Login() {
  const [isSubmit, setSubmit] = useState(false);
  return (
    <div className="flex justify-center items-center w-full h-dvh">
      <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
        <GoogleLoginButton isSubmit={isSubmit} setSubmit={setSubmit}>
          <ButtonCustom
            backgroundColor={"transparent"}
            isSubmit={isSubmit}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 10,
              height:"3.5rem",
              width:"9.5rem",
              border: "1px solid gray",
              borderRadius: "10px",
              padding: "0.8rem 1rem",
            }}
          >
            {!isSubmit && (
              <>
                <img src="/images/google.png" alt="" className="w-6" />
                <span className="text-gray-700 text-sm font-bold">Google</span>
              </>
            )}
          </ButtonCustom>
        </GoogleLoginButton>
      </GoogleOAuthProvider>
    </div>
  );
}

export default Login;

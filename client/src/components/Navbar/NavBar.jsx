import React from "react";
import { useSelector } from "react-redux";
import GoogleLoginButton from "../GoogleLoginButton/GoogleLoginButton";
import { GoogleOAuthProvider } from "@react-oauth/google";

function NavBar() {
  const auth = useSelector((state) => state.auth);
  if (!auth.data) return null; // Prevent rendering if auth is empty

  return (
    <nav className="w-full p-4 flex justify-end">
      <div className="flex gap-2 justify-center items-center">
        <div className="grid leading-5">
          <span className="text-gray-600 font-bold">{auth.data.email}</span>
          <span className="text-gray-600 font-normal text-sm text-right">
            <GoogleOAuthProvider
              clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}
            >
              <GoogleLoginButton>
                <span className="hover:cursor-pointer hover:font-bold transition-all">switch account</span>
              </GoogleLoginButton>
            </GoogleOAuthProvider>
          </span>
        </div>
        <div className="bg-gray-800 w-12 aspect-square rounded-full overflow-hidden">
          <img
            src={auth.data.avatar}
            alt="Profile"
            className="w-full h-full object-cover"
            loading="lazy" // Reduce initial load impact
            referrerPolicy="no-referrer" // Avoid tracking issues
          />
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

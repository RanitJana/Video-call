import { useGoogleLogin } from "@react-oauth/google";
import { useEffect } from "react";
import { handleLogin } from "../../api/auth.api.js";
import { useDispatch } from "react-redux";
import { setAuth } from "../../features/auth/auth.slice.js";

function GoogleLoginButton({ setSubmit, isSubmit, children }) {
  const dispatch = useDispatch();
  const login = async (authResponse) => {
    if (isSubmit) return;
    setSubmit(true);
    try {
      const response = await handleLogin({
        access_token: authResponse.access_token,
      });

      const responseData = response.data;

      if (responseData) {
        const { user, success, message } = responseData;

        if (success) {
          dispatch(setAuth({ user }));
          localStorage.setItem("_res_info", JSON.stringify(user));
        } else console.log(message);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmit(false);
    }
  };

  useEffect(() => {
    const info = localStorage.getItem("_res_info");
    if (info) {
      dispatch(setAuth({ user: JSON.parse(info) }));
    }
  }, [dispatch]);

  const googleLogin = useGoogleLogin({
    onSuccess: login,
    onError: login,
    flow: "implicit",
  });

  return (
    <div
      onClick={() => {
        if (isSubmit) return;
        googleLogin();
      }}
    >
      {children}
    </div>
  );
}

export default GoogleLoginButton;

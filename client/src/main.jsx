import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import SocketContext from "./context/SocketContext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <SocketContext>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss={false}
          draggable={false}
          pauseOnHover={false}
          theme="dark"
        />
        <App />
      </SocketContext>
    </Provider>
  </BrowserRouter>
);

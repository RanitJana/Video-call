import { BrowserRouter } from "react-router";
import { createRoot } from "react-dom/client";
import { store } from "./app/store.js";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App.jsx";
import SocketContext from "./context/SocketContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <SocketContext>
        <App />
      </SocketContext>
    </Provider>
  </BrowserRouter>
);

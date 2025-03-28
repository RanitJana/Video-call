import { io } from "socket.io-client";
import { useContext, createContext, useMemo } from "react";

const socketContext = createContext(null);

// eslint-disable-next-line react-refresh/only-export-components
export const useSocketContext = () => {
  return useContext(socketContext);
};

function SocketContext({ children }) {
  const socket = useMemo(
    () => io(import.meta.env.VITE_BACKEND_URI, { withCredentials: true }),
    []
  );

  return (
    <socketContext.Provider value={{ socket }}>
      {children}
    </socketContext.Provider>
  );
}

export default SocketContext;

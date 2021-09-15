import React, { useContext, useEffect, useState } from "react";
import io from "socket.io-client";

const SocketContext = React.createContext();

export function useSocket() {
  return useContext(SocketContext);
}

export function SocketProvider({ id, children }) {
  const [socket, setSocket] = useState();
  // const endpoint = "https://accessible-ir-server.herokuapp.com/";
  const endpoint = "http://localhost:5000"

  useEffect(() => {
    const newSocket = io(endpoint, {
      query: { id },
    }); // change address for deployment?
    setSocket(newSocket);
    return () => newSocket.close();
  }, [id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
}

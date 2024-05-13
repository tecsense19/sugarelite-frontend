'use client'
import React, { createContext, useContext } from "react";

// Create context
const SocketContext = createContext();

// Create custom hook to use Socket context
export const useSocket = () => {
    return useContext(SocketContext);
};

// Provide Socket context to components
export const SocketProvider = ({ children }) => {
    const [mySocket, setSocket] = React.useState(null);

    return (
        <SocketContext.Provider value={{ mySocket, setSocket }}>
            {children}
        </SocketContext.Provider>
    );
};

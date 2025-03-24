import React, { createContext, useContext, useEffect, useState } from "react";

const WebSocketContext = createContext(null);

const WS_URL=import.meta.env.VITE_WS_URL

export const WebSocketProvider = ({ children }) => {
    const [ws, setWs] = useState(null);

    useEffect(() => {
        const socket = new WebSocket(WS_URL);

        socket.onopen = () => console.log("WebSocket Connected");
        socket.onclose = () => console.log("WebSocket Disconnected");

        setWs(socket);

        return () => {
            socket.close();
        };
    }, []);

    return (
        <WebSocketContext.Provider value={ws}>
            {children}
        </WebSocketContext.Provider>
    );
};

export const useWebSocket = () => useContext(WebSocketContext);
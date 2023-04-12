import socketio from "socket.io-client";
import React from "react";

export const socket = socketio.connect('http://127.0.0.1:9999');
export const SocketContext = React.createContext();
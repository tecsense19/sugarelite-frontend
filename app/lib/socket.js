"use client"
import io from 'socket.io-client';
import { socket_server } from './helpers';

let socket;

export const connectSocket = (id) => {
    socket = io(socket_server);
    socket.emit("join", id)
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};

export const getSocket = () => {
    return socket
}

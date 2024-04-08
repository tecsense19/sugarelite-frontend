"use client"
import io from 'socket.io-client';
import { socket_server } from './helpers';

let socket;

export const connectSocket = () => {
    socket = io(socket_server);

};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};

export const getSocket = () => {
    return socket
}

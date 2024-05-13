"use client"
import io from 'socket.io-client';
import { socket_server } from './helpers';

let socket;

export const connectSocket = (id) => {
    if (id) {
        fetch("/api/socket");
        socket = io();
        socket.emit("join", id)
    }
};

export const disconnectSocket = () => {
    if (socket) {
        socket.disconnect();
    }
};

export const getSocket = () => {
    return socket
}

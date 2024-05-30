let socket;

export const connectSocket = (connection) => {
    socket = connection
}

export const sendMatchReq = (data) => {
    socket.emit("card-swiped", data)
}

export const sendMsg = (data) => {
    socket.emit('send-message', data)
}

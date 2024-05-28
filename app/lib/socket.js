let socket;

export const connectSocket = (connection) => {
    socket = connection
}

export const sendMatchReq = (data) => {
    socket.emit("card-swiped", data)
}
import { Server } from "socket.io";

export default function SocketHandler(req, res) {
    if (res.socket.server.io) {
        res.end();
        return;
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    global.onlineUsers = new Map();

    io.on("connection", (socket) => {

        console.log("connection found")
        global.chatBox = socket

        socket.on("add-user", (userId) => {
            onlineUsers.set(userId, socket.id)
            io.emit("user-status", { userId, status: "online" });
        })

        socket.on("request", (obj) => {
            io.emit("notify-request", (obj))
        })

        socket.on("send-message", (obj) => {
            const sendUserSocket = onlineUsers.get(obj.to)
            if (sendUserSocket) {
                let msg = { ...obj, "read": true }
                io.emit("receive-message", msg);

            } else {
                let msg = { ...obj, "read": false }
                io.emit("receive-message", msg);
            }

        });

        socket.on("disconnect", () => {
            for (const [key, value] of global.onlineUsers) {
                if (value === socket.id) {
                    io.emit("user-status", { userId: key, status: "offline" });
                    global.onlineUsers.delete(key);
                    break;
                }
            }
            // console.log(onlineUsers)
        });
    });

    res.end();
}
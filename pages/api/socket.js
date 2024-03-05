import { Server } from "socket.io";

export default function SocketHandler(req, res) {
    if (res.socket.server.io) {
        res.end();
        return;
    }

    const io = new Server(res.socket.server, { path: '/api/socket', addTrailingSlash: false });
    res.socket.server.io = io;


    io.on("connection", (socket) => {

        console.log("connection found")

        socket.on("add-user", (userId) => {
            io.emit("user-status", { userId, status: "online" });
        })

        socket.on("request", (obj) => {
            io.emit("notify-request", (obj))
        })

        socket.on("send-message", (obj) => {
            io.emit("receive-message", obj);
        });

        socket.on("disconnect", () => {

        });
    });

    res.end();
}
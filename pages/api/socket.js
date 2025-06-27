import { data } from "autoprefixer";
import { Server } from "socket.io";

export default function SocketHandler(req, res) {
    if (res.socket.server.io) {
        res.end();
        return;
    }

    const io = new Server(res.socket.server, {
        cors: ['https://sugarelite.tec-sense.co.in', 'https://sugarelite.website4you.co.in']
    });
    res.socket.server.io = io;


    const onlineUsers = new Map()


    io.on("connection", (socket) => {

        // console.log("connection found")

        socket.on("join", (userId) => {
            onlineUsers.set(userId, socket.id);
            console.log(`User ${userId} joined. Total online users: ${onlineUsers.size}`);
            io.emit("onlineUsers", Array.from(onlineUsers.keys()));
        });


        socket.on("send-message", (obj) => {
            io.emit("receive-message", obj);
        });

        socket.on("delete-message", (obj) => {
            io.emit("message-deleted", obj);
        });

        socket.on("open-chat", ({ sender_id, receiver_id, type, lastMsgId }) => {
            if (onlineUsers.has(receiver_id)) {
                const socketId = onlineUsers.get(receiver_id);
                io.to(socketId).emit("opened-chat-user", { sender_id: sender_id, type: type, lastMsgId: lastMsgId });
            }
        })

        socket.on("typing", (obj) => {
            io.emit("show-animation", obj)
        })

        socket.on("request-album", (obj) => {
            io.emit("album-notification", {
                ...obj,
                data: {
                    ...obj.data,
                    sender_id: parseInt(obj.data.sender_id),
                    receiver_id: parseInt(obj.data.receiver_id)
                }
            })
        })

        socket.on("album-access", (obj) => {
            io.emit('access-notify', obj)
        })

        socket.on("user-blocked", (obj) => {
            io.emit('blocked-status', obj)
        })

        socket.on("user-unblocked", (obj) => {
            io.emit('unblocked-status', obj)
        })

        socket.on("new-socket", () => {
            io.emit("new-status")
        })

        socket.on('card-swiped', (obj) => {
            io.emit('swipe-notify', obj)
        })

        socket.on("disconnect", () => {
            for (const [userId, socketId] of onlineUsers.entries()) {
                if (socketId === socket.id) {
                    onlineUsers.delete(userId);
                    console.log(`User ${userId} disconnected. Total online users: ${onlineUsers.size}`);
                    io.emit("onlineUsers", Array.from(onlineUsers.keys()));
                    break;
                }
            }
            console.log(`Socket ${socket.id} closed.`);
        });
    });

    res.end();
}
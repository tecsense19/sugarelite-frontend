import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3000;
const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
    const httpServer = createServer(handler);

    const io = new Server(httpServer);

    let onlineUsers = [];
    let activeChatSessions = [];

    const updateUserActivity = (userId, socketId) => {
        const userIndex = onlineUsers.findIndex(user => user.userId === userId);
        if (userIndex !== -1) {
            onlineUsers[userIndex].lastActivity = new Date();
            onlineUsers[userIndex].status = "online"
            onlineUsers[userIndex].socketId = socketId
        }
    };

    const removeInactiveUsers = () => {
        const currentTime = new Date();
        onlineUsers = onlineUsers.filter(user => {
            const inactiveTime = currentTime - user.lastActivity;
            if (inactiveTime >= (60 * 60 * 1000)) { // 60 minutes
                console.log(`User ${user.userId} has been inactive for more than 60 minutes. Removing from online users.`);
                return false; // Exclude user from online users
            } else if (inactiveTime >= (1 * 60 * 1000)) { // 10 minutes
                user.status = "offline";
            }
            return true; // Keep user in online users
        });
        io.emit("onlineUsers", onlineUsers.map(user => ({ userId: user.userId, status: user.status, lastActivity: user.lastActivity })));
    };


    io.on("connection", (socket) => {

        socket.on("connection", (userId) => {
            const userIndex = onlineUsers.findIndex(user => user.userId === userId);
            if (userIndex !== -1) {
                updateUserActivity(userId, socket.id);
            } else {
                const newUser = { userId, socketId: socket.id, status: "online", lastActivity: new Date() };
                onlineUsers.push(newUser);
                console.log(`User ${userId} joined. Total online users: ${onlineUsers.length}`);
            }
            removeInactiveUsers()
            // io.emit("onlineUsers", onlineUsers.map(user => ({ userId: user.userId, status: user.status, lastActivity: user.lastActivity })));
        });

        socket.on('send-msg', (obj) => {
            const receiver = onlineUsers.find(user => user.userId === obj.receiver_id);
            if (receiver) {
                io.to(receiver.socketId).emit('receive-msg', obj);
                updateUserActivity(obj.sender_id, socket.id);
            }
        });

        socket.on('startChat', ({ senderId, receiverId, messageId }) => {
            const receiver = onlineUsers.find(user => user.userId === receiverId);
            // console.log(receiver)
            if (receiver) {
                console.log(`Chat started between ${senderId} and ${receiverId}`);

                // Check if a session already exists between sender and receiver
                const existingSessionIndex = activeChatSessions.findIndex(session =>
                    (session.senderId === senderId && session.receiverId === receiverId)
                );

                // If session exists, update it with new messageId and set type to "open"
                if (existingSessionIndex !== -1) {
                    activeChatSessions[existingSessionIndex].messageId = messageId;
                    activeChatSessions[existingSessionIndex].type = "open";
                } else {
                    // If session doesn't exist, create a new one
                    activeChatSessions.push({ senderId, receiverId, messageId, type: "open" });
                }

                io.to(receiver.socketId).emit("opened-chat", activeChatSessions);
            }
        });

        socket.on('endChat', ({ senderId, receiverId }) => {
            const receiver = onlineUsers.find(user => user.userId === receiverId);
            if (receiver) {
                console.log(`Chat ended between ${senderId} and ${receiverId}`);

                // Find the session to update
                const sessionIndex = activeChatSessions.findIndex(session =>
                    (session.senderId === senderId && session.receiverId === receiverId)
                );

                // If session found, update its type to "closed"
                if (sessionIndex !== -1) {
                    activeChatSessions[sessionIndex].type = "closed";
                    io.to(receiver.socketId).emit("closed-chat", activeChatSessions);
                }
            }
        });

        socket.on("request-album", (obj) => {
            io.emit("album-notification", obj)
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

        socket.on('card-swiped', (obj) => {
            io.emit('swipe-notify', obj)
        })


        socket.on("logout", (userId) => {
            const userIndex = onlineUsers.findIndex(user => user.userId === userId);
            if (userIndex !== -1) {
                onlineUsers.splice(userIndex, 1); // Remove user from online users
                console.log(`User ${userId} logged out.`);
            }
            io.emit("onlineUsers", onlineUsers.map(user => ({ userId: user.userId, status: user.status, lastActivity: user.lastActivity })));
        });
    });

    httpServer
        .once("error", (err) => {
            console.error(err);
            process.exit(1);
        })
        .listen(port, () => {
            console.log(`> Ready on http://${hostname}:${port}`);
        });
});

"use client"

import { client_routes, socket_server } from "@/app/lib/helpers";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ChatComponent from "./ChatComponent/ChatComponent";
import { useStore } from "@/store/store";
import NoChatFound from "./NoChatFound";
import { useRouter } from "next/navigation";
import ProfileList from "./Profiles/ProfileList";
import { getSocket } from "@/app/lib/socket";

// const useSocket = () => {
//     const [socket, setSocket] = useState(null);

//     useEffect(() => {
//         const newSocket = io(socket_server);
//         setSocket(newSocket);

//         return () => {
//             newSocket.disconnect();
//         };
//     }, []);

//     return socket;
// };


const Index = ({ decryptedUser, profilesList, allUsers, myChats }) => {

    const { state: { userState, newMsgState, mySocket, toMessageState, chatProfileState }, dispatch } = useStore()
    const socket = getSocket()
    const toUser = toMessageState

    const [profiles, setProfiles] = useState(profilesList)
    const [chats, setMyChats] = useState(myChats)
    const [showMobileChatContent, setShowMobileChatContent] = useState(false);
    const navigate = useRouter()
    const [unReadCount, setUnReadCount] = useState([])
    const [sendingImages, setSendingImages] = useState([])

    const [currentUser, setCurrentUser] = useState(userState ? userState : decryptedUser)

    useEffect(() => {
        setCurrentUser(userState ? userState : decryptedUser)
        if (!userState?.id) {
            navigate.push(client_routes.home)
        }
    }, [userState])

    useEffect(() => {
        dispatch({ type: "Add_Msg_Badge", payload: false })
    }, [])

    useEffect(() => {
        if (window.innerWidth <= 768 && toUser) {
            setShowMobileChatContent(true)
        }
    }, [toUser])

    useEffect(() => {
        // console.log(currentUser)
    }, [])


    useEffect(() => {
        if (!socket) return;
        const receiveMessageHandler = (obj) => {
            if (obj.receiver_id === currentUser.id) {
                dispatch({ type: "Add_Message", payload: obj })
                if (toUser?.id !== obj.sender_id && obj?.type === "regular") {
                    setUnReadCount(prevUnreadMsgs => {
                        const updatedUnreadMsgs = [...prevUnreadMsgs];
                        const existingIndex = updatedUnreadMsgs.findIndex(item => item.id === obj.sender_id);

                        if (existingIndex !== -1) {
                            updatedUnreadMsgs[existingIndex].count += 1;
                        } else {
                            updatedUnreadMsgs.push({ id: obj.sender_id, count: 1 });
                        }

                        return updatedUnreadMsgs;
                    });
                }
            } else if (obj.sender_id === currentUser.id) {
                dispatch({ type: "Add_Message", payload: obj })
            }
        };

        socket.on("receive-message", receiveMessageHandler);
        return () => {
            socket.off("receive-message", receiveMessageHandler);
        };
    }, [socket, toUser, unReadCount]);


    useEffect(() => {
        const mergedChats = myChats.map(i => {
            const newMsgIndex = newMsgState.findIndex(msg => msg.id === i.id);
            if (newMsgIndex !== -1) {
                return newMsgState[newMsgIndex];
            }
            return i;
        });

        const updatedChats = [...mergedChats];

        newMsgState.forEach(newMsg => {
            const chatExists = myChats.some(i => i.id === newMsg.id);
            if (!chatExists) {
                updatedChats.push(newMsg);
            }
        });
        setMyChats(updatedChats)
    }, [newMsgState]);

    useEffect(() => {
        setUnReadCount((prev) => {
            const updatedUnreadMsgs = [...prev];
            const existingIndex = updatedUnreadMsgs.filter(item => item.id !== toUser.id);
            return existingIndex
        })
    }, [toUser])


    if (chatProfileState.length || newMsgState.length) {
        return (
            <>
                <div className="font-bold hidden h-dvh pt-0 md:pt-[66px] text-white md:flex">
                    <ProfileList currentUser={currentUser} toUser={toUser} unReadCount={unReadCount} allUsers={allUsers} myChats={chats} />
                    <ChatComponent currentUser={currentUser} sendingImages={sendingImages} myChats={chats} setSendingImages={setSendingImages} setShowMobileChatContent={setShowMobileChatContent} socket={socket} toUser={toUser} userChats={toUser && chats.filter(i => i.sender_id === toUser.id || i.receiver_id === toUser.id)} />
                </div>
                <div className="font-bold md:hidden h-dvh pt-0 md:pt-[66px] text-white flex">
                    {
                        !showMobileChatContent ?
                            <ProfileList currentUser={currentUser} toUser={toUser} unReadCount={unReadCount} allUsers={allUsers} myChats={chats} />
                            :
                            <ChatComponent currentUser={currentUser} sendingImages={sendingImages} myChats={chats} setSendingImages={setSendingImages} setShowMobileChatContent={setShowMobileChatContent} socket={socket} toUser={toUser} userChats={toUser && chats.filter(i => i.sender_id === toUser.id || i.receiver_id === toUser.id)} />
                    }
                </div>
            </>
        )
    } else {
        return <NoChatFound />
    }
}

export default Index
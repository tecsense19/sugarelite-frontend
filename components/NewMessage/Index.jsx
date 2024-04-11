"use client"

import { client_routes, socket_server } from "@/app/lib/helpers";
import { useCallback, useEffect, useRef, useState } from "react";
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


const Index = ({ decryptedUser, allUsers, myChats }) => {

    const { state: { userState, newMsgState, toMessageState, chatProfileState }, dispatch } = useStore()
    const socket = getSocket()
    const toUser = toMessageState

    const [profiles, setProfiles] = useState([])
    const [chats, setMyChats] = useState(myChats)
    const [showMobileChatContent, setShowMobileChatContent] = useState(false);
    const navigate = useRouter()
    const [unReadCount, setUnReadCount] = useState([])
    const [sendingImages, setSendingImages] = useState([])
    const [lastUpdatedMsg, setLastUpdatedMsg] = useState(null)
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
        if (toUser) {
            setUnReadCount((prev) => {
                const updatedUnreadMsgs = [...prev];
                const existingIndex = updatedUnreadMsgs.filter(item => item.id !== toUser.id);
                return existingIndex
            })
        }
    }, [toUser])

    // useEffect(() => {
    //     const myChatsWithProfiles = chatProfileState.map(profileID => {
    //         const profile = allUsers.find(user => user.id === profileID.id);
    //         const conversation = myChats.filter(chat => chat.sender_id === profileID.id || chat.receiver_id === profileID.id);
    //         conversation.sort((a, b) => a.id - b.id);
    //         let messages;
    //         if (conversation.length > 0) {
    //             messages = conversation[conversation.length - 1];
    //         } else {
    //             messages = { milisecondtime: profileID.milisecondtime };
    //         }

    //         return {
    //             profile,
    //             messages: { ...messages, milisecondtime: parseInt(messages.milisecondtime) }
    //         };
    //     });
    //     setProfiles(myChatsWithProfiles);
    // }, [chatProfileState, myChats, allUsers]);

    // const addNewMessageToConversation = useCallback((message, profile) => {
    //     if (message) {
    //         setProfiles(prevProfiles => {
    //             return prevProfiles.map(p => (p.profile.id === profile.profile.id ? { ...p, messages: message } : p));
    //         });
    //     } else {
    //         setProfiles((prev) => [profile, ...prev])
    //     }
    // }, []);

    // useEffect(() => {
    //     if (newMsgState.length) {
    //         const latestMsg = newMsgState[newMsgState.length - 1];
    //         const profile = profiles.find(i => i.profile.id === latestMsg.receiver_id);
    //         if (!profile) {
    //             const findProfile = allUsers.find(i => i.id === latestMsg.sender_id)
    //             if (findProfile) {
    //                 dispatch({ type: "Add_Profile", payload: { id: findProfile.id, milisecondtime: latestMsg.milisecondtime } })
    //                 console.log(latestMsg)
    //             }
    //         } else {
    //             if (!profile.messages || latestMsg.id >= profile.messages.id) {
    //                 addNewMessageToConversation(latestMsg, profile);
    //             } else if (!profile.messages.id) {
    //                 addNewMessageToConversation(latestMsg, profile);
    //             }
    //         }
    //     }
    // }, [newMsgState]);

    if (chatProfileState.length || newMsgState.length) {
        return (
            <>
                <div className="font-bold hidden h-dvh pt-0 md:pt-[66px] text-white md:flex">
                    <ProfileList currentUser={currentUser} toUser={toUser} unReadCount={unReadCount} allUsers={allUsers} myChats={chats} profileList={profiles} setProfiles={setProfiles} />
                    <ChatComponent currentUser={currentUser} sendingImages={sendingImages} myChats={chats} setSendingImages={setSendingImages} setShowMobileChatContent={setShowMobileChatContent} socket={socket} toUser={toUser} userChats={toUser && chats.filter(i => i.sender_id === toUser.id || i.receiver_id === toUser.id)} lastUpdatedMsg={lastUpdatedMsg} setLastUpdatedMsg={setLastUpdatedMsg} />
                </div>
                <div className="font-bold md:hidden h-dvh pt-0 md:pt-[66px] text-white flex">
                    {
                        !showMobileChatContent ?
                            <ProfileList currentUser={currentUser} toUser={toUser} unReadCount={unReadCount} allUsers={allUsers} myChats={chats} profileList={profiles} setProfiles={setProfiles} />
                            :
                            <ChatComponent currentUser={currentUser} sendingImages={sendingImages} myChats={chats} setSendingImages={setSendingImages} setShowMobileChatContent={setShowMobileChatContent} socket={socket} toUser={toUser} userChats={toUser && chats.filter(i => i.sender_id === toUser.id || i.receiver_id === toUser.id)} lastUpdatedMsg={lastUpdatedMsg} setLastUpdatedMsg={setLastUpdatedMsg} />
                    }
                </div>
            </>
        )
    } else {
        return <NoChatFound />
    }
}

export default Index
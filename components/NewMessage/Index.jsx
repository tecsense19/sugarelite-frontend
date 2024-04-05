"use client"

import { client_routes, socket_server } from "@/app/lib/helpers";
import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ChatComponent from "./ChatComponent/ChatComponent";
import { useStore } from "@/store/store";
import NoChatFound from "./NoChatFound";
import { useRouter } from "next/navigation";
import ProfileList from "./Profiles/ProfileList";

const useSocket = () => {
    const [socket, setSocket] = useState(null);

    useEffect(() => {
        const newSocket = io(socket_server);
        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    return socket;
};


const Index = ({ decryptedUser, profilesList, allUsers, myChats }) => {

    const socket = useSocket()
    const [profiles, setProfiles] = useState(profilesList)
    const [toUser, setToUser] = useState("")
    const [showMobileChatContent, setShowMobileChatContent] = useState(false);
    const navigate = useRouter()
    const { state: { userState, newMsgState }, dispatch } = useStore()
    const [unReadCount, setUnReadCount] = useState([])
    const [sendingImages, setSendingImages] = useState([])
    const [isFirstMount, setIsFirstMount] = useState(true);


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
        if (isFirstMount) {
            if (newMsgState.length) {
                newMsgState.forEach((message) => {
                    const profileIndex = profiles.findIndex(
                        i => i.profile.id === message.receiver_id || i.profile.id === message.sender_id
                    );
                    if (profileIndex !== -1 && message.id) {
                        const profile = profiles[profileIndex];
                        const msgIndex = profile.messages.findIndex(msg => msg.id === message.id);
                        if (msgIndex !== -1) {
                            profile.messages[msgIndex] = message;
                        } else {
                            profile.messages.push(message);
                        }
                        const updatedProfiles = [...profiles];
                        updatedProfiles[profileIndex] = profile;
                        updatedProfiles.sort((a, b) => {
                            const latestMessageIDA = a.messages.length > 0 ? parseInt(a.messages[a.messages.length - 1].milisecondtime) : 0;
                            const latestMessageIDB = b.messages.length > 0 ? parseInt(b.messages[b.messages.length - 1].milisecondtime) : 0;
                            return latestMessageIDB - latestMessageIDA;
                        });
                        setProfiles(updatedProfiles);
                    } else if (profileIndex !== -1 && !message.id) {
                        setToUser(message.user);
                    } else if (profileIndex === -1 && message.id) {
                        const receiverProfile = allUsers.find(i => (i.id === message.receiver_id));
                        const senderProfile = allUsers.find(i => (i.id === message.sender_id));
                        if (receiverProfile) {
                            const msgs = newMsgState.filter((i) => (i.receiver_id === receiverProfile.id))
                            const obj = { profile: receiverProfile, messages: msgs };
                            setProfiles(prev => [obj, ...prev]);
                        } else if (senderProfile) {
                            const msgs = newMsgState.filter((i) => (i.sender_id === senderProfile.id))
                            const obj = { profile: senderProfile, messages: msgs };
                            setProfiles(prev => [obj, ...prev]);
                        }
                    } else {
                        const obj = { profile: message.user, messages: [{ updated_at: message.updated_at, milisecondtime: message.milisecondtime }] };
                        setProfiles(prev => [obj, ...prev]);
                        setToUser(message.user);
                    }
                })
            }
            setIsFirstMount(false);
        } else {
            if (newMsgState.length > 0) {
                const message = newMsgState[newMsgState.length - 1];
                const profileIndex = profiles.findIndex(
                    i => i.profile.id === message.receiver_id || i.profile.id === message.sender_id
                );
                if (profileIndex !== -1 && message.id) {
                    const profile = profiles[profileIndex];
                    const msgIndex = profile.messages.findIndex(msg => msg.id === message.id);
                    if (msgIndex !== -1) {
                        profile.messages[msgIndex] = message;
                    } else {
                        profile.messages.push(message);
                    }
                    const updatedProfiles = [...profiles];
                    updatedProfiles[profileIndex] = profile;
                    updatedProfiles.sort((a, b) => {
                        const latestMessageIDA = a.messages.length > 0 ? parseInt(a.messages[a.messages.length - 1].milisecondtime) : 0;
                        const latestMessageIDB = b.messages.length > 0 ? parseInt(b.messages[b.messages.length - 1].milisecondtime) : 0;
                        return latestMessageIDB - latestMessageIDA;
                    });
                    setProfiles(updatedProfiles);
                } else if (profileIndex !== -1 && !message.id) {
                    setToUser(message.user);
                } else if (profileIndex === -1 && message.id) {
                    const profile = allUsers.find(i => i.id === message.sender_id);
                    if (profile) {
                        const obj = { profile: profile, messages: [message] };
                        setProfiles(prev => [obj, ...prev]);
                    }
                } else {
                    const obj = { profile: message.user, messages: [{ updated_at: message.updated_at, milisecondtime: message.milisecondtime }] };
                    setProfiles(prev => [obj, ...prev]);
                    setToUser(message.user);
                }
            }
        }
    }, [newMsgState]);

    useEffect(() => {
        // console.log(newMsgState)
    }, [newMsgState])


    useEffect(() => {
        setUnReadCount((prev) => {
            const updatedUnreadMsgs = [...prev];
            const existingIndex = updatedUnreadMsgs.filter(item => item.id !== toUser.id);
            return existingIndex
        })
    }, [toUser])


    if (profiles.length || newMsgState.length) {
        return (
            <>
                <div className="font-bold hidden h-dvh pt-0 md:pt-[66px] text-white md:flex">
                    <ProfileList currentUser={currentUser} profiles={profiles.filter((obj, index, self) =>
                        index === self.findIndex((t) => (
                            t.profile.id === obj.profile.id
                        ))
                    )} setToUser={setToUser} toUser={toUser} unReadCount={unReadCount} />
                    <ChatComponent currentUser={currentUser} sendingImages={sendingImages} myChats={myChats} setSendingImages={setSendingImages} setShowMobileChatContent={setShowMobileChatContent} setToUser={setToUser} socket={socket} toUser={toUser} userChats={toUser ? profiles.find(i => i.profile.id === toUser.id).messages : []} />
                </div>
                <div className="font-bold md:hidden h-dvh pt-0 md:pt-[66px] text-white flex">
                    {
                        !showMobileChatContent ?
                            <ProfileList currentUser={currentUser} profiles={profiles.filter((obj, index, self) =>
                                index === self.findIndex((t) => (
                                    t.profile.id === obj.profile?.id
                                ))
                            )} setToUser={setToUser} toUser={toUser} unReadCount={unReadCount} />
                            :
                            <ChatComponent currentUser={currentUser} sendingImages={sendingImages} myChats={myChats} setSendingImages={setSendingImages} setShowMobileChatContent={setShowMobileChatContent} setToUser={setToUser} socket={socket} toUser={toUser} userChats={toUser ? profiles.find(i => i.profile.id === toUser.id).messages : []} />
                    }
                </div>
            </>
        )
    } else {
        return <NoChatFound />
    }
}

export default Index
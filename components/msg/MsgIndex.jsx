"use client"

import { client_routes, socket_server } from "@/app/lib/helpers";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import ProfileList from "./ProfileList/ProfileList";
import ChatComponent from "./ChatComponent/ChatComponent";
import { useStore } from "@/store/store";
import NoChatFound from "./NoChatFound";
import { useRouter } from "next/navigation";

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

const MsgIndex = ({ profilesList, decryptedUser, userChats }) => {

    const socket = useSocket()

    const [toUser, setToUser] = useState("")
    const [showMobileChatContent, setShowMobileChatContent] = useState(false);
    const [currentUser, setCurrentUser] = useState(decryptedUser)
    const navigate = useRouter()

    const { state: { userState } } = useStore()

    useEffect(() => {
        setCurrentUser(userState)
        if (!userState?.id) {
            navigate.push(client_routes.home)
        }
    }, [userState])

    useEffect(() => {
        if (window.innerWidth <= 768 && toUser) {
            setShowMobileChatContent(true)
        }
    }, [toUser])



    if (profilesList.length) {
        return (
            <>
                <div className="font-bold hidden h-dvh pt-0 md:pt-[66px] text-white md:flex">
                    <ProfileList profileList={profilesList} setToUser={setToUser} socket={socket} currentUser={currentUser} toUser={toUser} />
                    <ChatComponent setToUser={setToUser} toUser={toUser} userChats={userChats} currentUser={currentUser} socket={socket} />
                </div>
                <div className="font-bold md:hidden h-dvh pt-0 md:pt-[66px] text-white flex">
                    {
                        !showMobileChatContent ?
                            <ProfileList profileList={profilesList} setToUser={setToUser} socket={socket} currentUser={currentUser} toUser={toUser} />
                            :
                            <ChatComponent setToUser={setToUser} toUser={toUser} userChats={userChats} currentUser={currentUser} setShowMobileChatContent={setShowMobileChatContent} socket={socket} />
                    }
                </div>
            </>
        )
    } else {
        return <NoChatFound />
    }
}

export default MsgIndex
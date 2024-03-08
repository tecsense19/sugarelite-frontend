"use client"

import { useEffect, useState } from "react";
import "./ChatContent.css";
import ChatSection from "./ChatSection";
import { io } from "socket.io-client";

let socket;

const ChatContent = ({ selectedObj, profiles, showMobileChatContent, setShowMobileChatContent, currentUser, messages }) => {

  const [chats, setChats] = useState(messages)

  useEffect(() => {
    setChats(messages)
  }, [messages])


  function socketInitializer() {
    //   // fetch("/api/socket");

    socket = io("http://localhost:8080");

    socket.on("receive-message", async (data) => {
      if (data.sender_id === currentUser.id) {
        setChats((pre) => [...pre, data]);
      }
      if ((data.receiver_id === currentUser.id)) {
        if (data.sender_id === selectedObj.id) {
          setChats((pre) => [...pre, data]);

        } else {
          // toast.info("Message from " + data.receiverName)
        }
      }
    });
  }


  useEffect(() => {
    socketInitializer()

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, [])

  return (
    <div className="flex w-full md:w-[calc(100%-350px)] lg:w-[calc(100%-400px)] h-full flex-col">
      {selectedObj
        ? <>
          <ChatSection selectedObj={selectedObj} profiles={profiles} showMobileChatContent={showMobileChatContent} setShowMobileChatContent={setShowMobileChatContent} currentUser={currentUser} chat={chats} />
        </>
        : <div className="flex justify-center items-center w-full h-full" data-aos="fade-left" data-aos-duration="800">
          <div className="text-[22px]">Please click on a profile to chat</div>
        </div>
      }
    </div>
  )
}

export default ChatContent
import React, { useEffect, useMemo, useState } from 'react'
import ChatHeader from './ChatHeader';
import { ConfigProvider, Drawer } from 'antd';
import ToUserProfile from './ToUserProfile';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';
import ImagesModal from './ImagesModel'
import SupportMessges from './SupportMessges';
import AdminSideProfile from '../AdminSideProfile';
import { useStore } from '@/store/store';
import BlockedComponent from './BlockedComponent';
import { useSocket } from '@/store/SocketContext';
import Link from 'next/link';
import { client_routes } from '@/app/lib/helpers';

const ChatSection = ({ toUser, setShowMobileChatContent, user, messages, supportChat, setMessages, sendingImages, setSendingImages, allStrings }) => {

    const { state: { blockedUsersState } } = useStore()
    const { mySocket } = useSocket()

    const [todayMsgs, setTodayMsgs] = useState(0)
    const [showMobileProfile, setShowMobileProfile] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingMsg, setEditingMsg] = useState(null)
    const [selectedImages, setSelectedImages] = useState([])

    const filteredChatList = useMemo(() => {
        if (!toUser) return [];
        return messages.filter(msg => msg.sender_id === toUser.id || msg.receiver_id === toUser.id);
    }, [toUser, messages]);

    const onDrawerClose = () => {
        setDrawerOpen(false)
    }

    useEffect(() => {
        if (messages.length) {
            const myMsgs = messages.filter(msg => msg.status !== "new");
            if (myMsgs.length) {
                const myChats = myMsgs.filter((msg) => msg.sender_id === user.id);
                const today = new Date().toLocaleDateString();
                const todayChats = myChats.filter((chat) => {
                    const chatDate = new Date(chat.created_at).toLocaleDateString();
                    return chatDate === today;
                });
                setTodayMsgs(todayChats.length);
            } else {
                setTodayMsgs(0);
            }
        }
    }, [messages])

    return (
        <div className='h-full w-full flex'>
            <div className='w-full 2xl:w-[calc(100%-400px)]'>

                <ChatHeader setShowMobileChatContent={setShowMobileChatContent} setShowMobileProfile={setShowMobileProfile} setDrawerOpen={setDrawerOpen} toUser={toUser} currentUser={user} allStrings={allStrings} />
                {
                    toUser !== "Admin"
                        ? (!blockedUsersState.some(i => (i.sender_id === toUser.id || i.receiver_id === toUser.id) && i.is_blocked === 1))
                            ? <>
                                <ChatBody chatList={filteredChatList} sendingImages={sendingImages} setSelectedImages={setSelectedImages} toUser={toUser} user={user} setEditingMsg={setEditingMsg} allStrings={allStrings} />
                                {((user.is_subscribe === 1 && user.is_subscription_stop === 0 && user.is_subscription_cancel === 0) || (todayMsgs < 3))
                                    ? <ChatInput toUser={toUser} user={user} editingMsg={editingMsg} setEditingMsg={setEditingMsg} sendingImages={sendingImages} setSendingImages={setSendingImages} setMessages={setMessages} allStrings={allStrings} />
                                    : <div className="w-full flex flex-col px-4 pb-[18px] md:px-10 md:pb-10 relative ">
                                        <div className="w-full h-full pb-[18px]  md:pb-10 my-auto">
                                            <div className="w-full py-2 md:py-4 rounded-[5px] bg-black my-auto h-full text-center items-center px-3 md:px-[30px] text-[12px] md:text-[16px] text-white/80 justify-center">{allStrings["string_chat_limit_exceeded_for_today!_upgrade_to"]} <Link href={client_routes.subscription} className="text-secondary inline">{allStrings["string_premium"]}</Link> {allStrings["string_for_unlimited_chatting."]} 🚀</div>
                                        </div>
                                    </div>
                                }
                            </>
                            : <BlockedComponent user={user} toUser={toUser} allStrings={allStrings} />
                        : <SupportMessges supportChat={supportChat.reverse()} />
                }
            </div>
            {
                toUser !== "Admin" ? <>
                    <div className="hidden 2xl:block w-[400px]">
                        <ToUserProfile selectedObj={toUser} allStrings={allStrings} />
                    </div>
                    <div className='block 2xl:hidden'>
                        {
                            showMobileProfile &&
                            <ConfigProvider theme={{ token: { colorBgElevated: "#2d2d2d" } }}>
                                <Drawer width={400} closable={false} onClose={onDrawerClose} open={drawerOpen} style={{ container: { width: "400px" } }} styles={{ body: { padding: "0px" } }}>
                                    <ToUserProfile selectedObj={toUser} setShowMobileProfile={setShowMobileProfile} allStrings={allStrings} />
                                </Drawer>
                            </ConfigProvider>
                        }
                    </div>
                </> : <AdminSideProfile allStrings={allStrings} />
            }
            <ImagesModal list={selectedImages} setSelctedImages={setSelectedImages} allStrings={allStrings} />
        </div>
    )
}

export default React.memo(ChatSection)
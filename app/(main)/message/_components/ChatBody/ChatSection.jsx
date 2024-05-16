import React, { useMemo, useState } from 'react'
import ChatHeader from './ChatHeader';
import { ConfigProvider, Drawer } from 'antd';
import ToUserProfile from './ToUserProfile';
import ChatBody from './ChatBody';
import ChatInput from './ChatInput';
import ImagesModal from './ImagesModel'
import SupportMessges from './SupportMessges';
import AdminSideProfile from '../AdminSideProfile';

const ChatSection = ({ toUser, setShowMobileChatContent, user, messages, supportChat }) => {

    const [showMobileProfile, setShowMobileProfile] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingMsg, setEditingMsg] = useState(null)
    const [selectedImages, setSelectedImages] = useState([])
    const [sendingImages, setSendingImages] = useState([])

    const filteredChatList = useMemo(() => {
        if (!toUser) return [];
        return messages.filter(msg => msg.sender_id === toUser.id || msg.receiver_id === toUser.id);
    }, [toUser, messages]);

    return (
        <div className='h-full w-full flex'>
            <div className='w-full 2xl:w-[calc(100%-400px)]'>
                <ChatHeader setShowMobileChatContent={setShowMobileChatContent} setShowMobileProfile={setShowMobileProfile} setDrawerOpen={setDrawerOpen} toUser={toUser} currentUser={user} />
                {
                    toUser !== "Admin" ?
                        <>
                            <ChatBody chatList={filteredChatList} sendingImages={sendingImages} setSelectedImages={setSelectedImages} toUser={toUser} user={user} />
                            <ChatInput toUser={toUser} user={user} editingMsg={editingMsg} setEditingMsg={setEditingMsg} sendingImages={sendingImages} setSendingImages={setSendingImages} />
                        </> :
                        <SupportMessges supportChat={supportChat.map(i => i.get_support)} />
                }
            </div>
            {
                toUser !== "Admin" ? <>
                    <div className="hidden 2xl:block w-[400px]">
                        <ToUserProfile selectedObj={toUser} />
                    </div>
                    <div className='block 2xl:hidden'>
                        {
                            showMobileProfile &&
                            <ConfigProvider theme={{ token: { colorBgElevated: "#2d2d2d" } }}>
                                <Drawer width={400} closable={false} onClose={onDrawerClose} open={drawerOpen} style={{ container: { width: "400px" } }} styles={{ body: { padding: "0px" } }}>
                                    <ToUserProfile selectedObj={toUser} setShowMobileProfile={setShowMobileProfile} />
                                </Drawer>
                            </ConfigProvider>
                        }
                    </div>
                </> : <AdminSideProfile />
            }
            <ImagesModal list={selectedImages} setSelctedImages={setSelectedImages} />
        </div>
    )
}

export default ChatSection
import React, { useMemo, useState, } from 'react'
import ChatHeader from './ChatHeader'
import ChatBody from './ChatBody'
import InputChat from './InputChat'
import ToUserProfile from '../ToUserProfile'
import { ConfigProvider, Drawer } from 'antd'
import ImagesModal from '../ImagesModel'

const ChatSection = ({ setToUser, toUser, user, chatList, setShowMobileChatContent, sendingImages, setSendingImages }) => {

    const [showMobileProfile, setShowMobileProfile] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingMsg, setEditingMsg] = useState(null)
    const [selectedImages, setSelectedImages] = useState([])

    const filteredChatList = useMemo(() => {
        if (!toUser) return [];
        return chatList.filter(msg => msg.sender_id === toUser.id || msg.receiver_id === toUser.id);
    }, [toUser, chatList]);

    const onDrawerClose = () => {
        setDrawerOpen(false)
    }

    return (
        <>
            <div className='h-full w-full flex'>
                <div className='w-full 2xl:w-[calc(100%-400px)]'>
                    <ChatHeader setToUser={setToUser} toUser={toUser} currentUser={user} setShowMobileProfile={setShowMobileProfile} setDrawerOpen={setDrawerOpen} setShowMobileChatContent={setShowMobileChatContent} />
                    <ChatBody user={user} toUser={toUser} chatList={filteredChatList} sendingImages={sendingImages} setSelectedImages={setSelectedImages} />
                    <InputChat toUser={toUser} user={user} editingMsg={editingMsg} setEditingMsg={setEditingMsg} sendingImages={sendingImages} setSendingImages={setSendingImages} />
                </div>
                <ImagesModal list={selectedImages} setSelctedImages={setSelectedImages} />
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
            </div>
        </>
    )
}

export default ChatSection
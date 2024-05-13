
import ChatHeader from './ChatHeader'
import AllMessages from './AllMessages'
import MessageInput from './MessageInput'
import { useEffect, useState } from 'react'
import SideProfile from '../SideProfile'
import { ConfigProvider, Drawer, notification } from 'antd'
import { useStore } from '@/store/store'
import ImagesModal from '../ImagesModal'
import { block_user_action } from '@/app/lib/actions'
import { client_notification } from '@/app/lib/helpers'
import { useSocket } from '@/store/SocketContext'

const ChatComponent = ({ toUser, setShowMobileChatContent, userChats, currentUser, sendingImages, setSendingImages, myChats, lastUpdatedMsg, setLastUpdatedMsg, isTyping, setUnsendedMsgs, unsendedMsgs }) => {

    const [showMobileProfile, setShowMobileProfile] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingMsg, setEditingMsg] = useState(null)
    const [todayMsgs, setTodayMsgs] = useState(0)
    const [api, contextHolder] = notification.useNotification()
    const [selectedImages, setSelectedImages] = useState([])
    const { state: { newMsgState, blockedUsersState } } = useStore()
    const { mySocket } = useSocket()
    const socket = mySocket

    const onDrawerClose = () => {
        setDrawerOpen(false)
    }

    useEffect(() => {
        const chatSocket = newMsgState.filter(chat => (chat.sender_id === currentUser.id && chat.id && chat.type !== "deleted"));
        const chats = myChats.filter((chat) => chat.sender_id === currentUser.id);
        const today = new Date().toLocaleDateString();
        const todayChats = chats.filter((chat) => {
            const chatDate = new Date(chat.updated_at).toLocaleDateString();
            return chatDate === today;
        });
        setTodayMsgs(todayChats.length + chatSocket.length)
    }, [newMsgState, toUser, userChats]);

    const unblockHandler = async () => {
        const res = await block_user_action({ sender_id: currentUser?.id, receiver_id: toUser.id, is_blocked: 0 })
        if (res.success) {
            client_notification(api, "topRight", "success", res.message, 4)
            socket.emit("user-unblocked", res.data)
        }
    }

    return (
        <div className="flex w-full md:w-[calc(100%-350px)] lg:w-[calc(100%-400px)] h-full flex-col">
            {contextHolder}
            {toUser ? (
                <div className='w-full h-full flex'>
                    <div className='w-full 2xl:w-[calc(100%-400px)]'>
                        <ChatHeader toUser={toUser} currentUser={currentUser} setShowMobileChatContent={setShowMobileChatContent} setShowMobileProfile={setShowMobileProfile} setDrawerOpen={setDrawerOpen} />
                        {
                            !blockedUsersState.some(i => (i.sender_id === toUser.id || i.receiver_id === toUser.id) && i.is_blocked === 1) ?
                                <>
                                    <AllMessages toUser={toUser} currentUser={currentUser} setTodayMsgs={setTodayMsgs} setEditingMsg={setEditingMsg} setDrawerOpen={setDrawerOpen} setShowMobileProfile={setShowMobileProfile} sendingImages={sendingImages} setSelectedImages={setSelectedImages} chats={userChats} lastUpdatedMsg={lastUpdatedMsg} setLastUpdatedMsg={setLastUpdatedMsg} isTyping={isTyping} unsendedMsgs={unsendedMsgs} />
                                    <MessageInput toUser={toUser} currentUser={currentUser} todayMsgs={todayMsgs} editingMsg={editingMsg} setEditingMsg={setEditingMsg} sendingImages={sendingImages} setSendingImages={setSendingImages} setUnsendedMsgs={setUnsendedMsgs} />
                                </> : <div className='h-full w-full flex justify-center items-center text-white/80 font-normal'>
                                    {
                                        blockedUsersState.some(i => (i.sender_id === currentUser.id) && i.is_blocked === 1) ?
                                            <div className='text-center flex flex-col gap-2'>
                                                <p > You blocked {toUser.username}</p>
                                                <div className='text-xs'>Click here to <button className='text-secondary text-sm' onClick={unblockHandler}>Unblock</button></div>
                                            </div> :
                                            <p ><span className='capitalize'>{toUser.username} </span>blocked you</p>
                                    }
                                </div>
                        }
                    </div>
                    <ImagesModal list={selectedImages} setSelctedImages={setSelectedImages} />
                    <div className="hidden 2xl:block w-[400px]" data-aos='fade-left'>
                        <SideProfile selectedObj={toUser} />
                    </div>
                    <div className='block 2xl:hidden'>
                        {
                            showMobileProfile &&
                            <ConfigProvider theme={{ token: { colorBgElevated: "#2d2d2d" } }}>
                                <Drawer width={400} closable={false} onClose={onDrawerClose} open={drawerOpen} style={{ container: { width: "400px" } }} styles={{ body: { padding: "0px" } }}>
                                    <SideProfile selectedObj={toUser} setShowMobileProfile={setShowMobileProfile} />
                                </Drawer>
                            </ConfigProvider>
                        }
                    </div>
                </div>
            ) : (
                <div className="flex justify-center items-center w-full h-full" data-aos="fade-left" data-aos-duration="800">
                    <div className="text-[22px]">Please click on a profile to chat</div>
                </div>
            )}
        </div>
    );
}

export default ChatComponent;

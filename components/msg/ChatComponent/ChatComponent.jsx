
import ChatHeader from './ChatHeader'
import AllMessages from './AllMessages'
import MessageInput from './MessageInput'
import { useEffect, useState } from 'react'
import SideProfile from '../SideProfile'
import { ConfigProvider, Drawer } from 'antd'
import { useStore } from '@/store/store'

const ChatComponent = ({ toUser, setShowMobileChatContent, setToUser, userChats, currentUser, socket, }) => {

    const [showMobileProfile, setShowMobileProfile] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [editingMsg, setEditingMsg] = useState(null)
    const [chats, setChats] = useState(userChats)
    const [todayMsgs, setTodayMsgs] = useState(0)

    const { state: { messageUpdate, newMsgState }, dispatch } = useStore()

    useEffect(() => {
        const editedFromNewMsgState = newMsgState.filter(newMsg => messageUpdate.some(oldMsg => oldMsg.id === newMsg.id));

        if (editedFromNewMsgState.length) {
            editedFromNewMsgState.forEach(i => {
                const msg = messageUpdate.find((y) => y.id === i.id)
                if (msg.type !== "deleted") {
                    dispatch({ type: "Add_Message", payload: { ...msg, type: msg.type, isEditDispatched: true } });
                } if (msg.type !== "edited") {
                    dispatch({ type: "Add_Message", payload: { ...i, type: msg.type, isDeleteDispatched: true } });
                }
            });
        }
    }, [messageUpdate])

    useEffect(() => {
        if (messageUpdate.length) {

            const updatedChats = chats.map(i => {
                const edited = messageUpdate.find(msg => msg.id === i.id);
                if (edited) {
                    return { ...i, text: edited.text, type: edited.type };
                }
                return i;
            });
            setChats(updatedChats);
        }
    }, [messageUpdate])

    const onDrawerClose = () => {
        setDrawerOpen(false)
    }

    useEffect(() => {
        const chatSocket = newMsgState.filter(chat => chat.sender_id === currentUser.id);
        const myChats = userChats.filter((chat) => chat.sender_id === currentUser.id);
        const today = new Date().toLocaleDateString();
        const todayChats = myChats.filter((chat) => {
            const chatDate = new Date(chat.updated_at).toLocaleDateString();
            return chatDate === today;
        });
        setTodayMsgs(todayChats.length + chatSocket.length)
    }, [newMsgState, toUser, userChats]);

    return (
        <div className="flex w-full md:w-[calc(100%-350px)] lg:w-[calc(100%-400px)] h-full flex-col">
            {toUser ? (
                <div className='w-full h-full flex'>
                    <div className='w-full  2xl:w-[calc(100%-400px)]'>
                        <ChatHeader toUser={toUser} setShowMobileChatContent={setShowMobileChatContent} setToUser={setToUser} setShowMobileProfile={setShowMobileProfile} setDrawerOpen={setDrawerOpen} />
                        <AllMessages chats={chats.filter(
                            message =>
                                (message.sender_id === currentUser.id && message.receiver_id === toUser.id) ||
                                (message.sender_id === toUser.id && message.receiver_id === currentUser.id)
                        )} toUser={toUser} currentUser={currentUser} socket={socket} setTodayMsgs={setTodayMsgs} setEditingMsg={setEditingMsg} setDrawerOpen={setDrawerOpen} setShowMobileProfile={setShowMobileProfile} />
                        <MessageInput socket={socket} toUser={toUser} currentUser={currentUser} todayMsgs={todayMsgs} editingMsg={editingMsg} setEditingMsg={setEditingMsg} />
                    </div>
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

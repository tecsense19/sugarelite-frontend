
import ChatHeader from './ChatHeader'
import AllMessages from './AllMessages'
import MessageInput from './MessageInput'
import { useEffect, useState } from 'react'
import SideProfile from '../SideProfile'
import { ConfigProvider, Drawer } from 'antd'

const ChatComponent = ({ toUser, setShowMobileChatContent, setToUser, userChats, currentUser, socket, }) => {

    const [showMobileProfile, setShowMobileProfile] = useState(false)
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [isAllowed, setIsAllowed] = useState(false)
    const [todayMsgs, setTodayMsgs] = useState(0)


    const onDrawerClose = () => {
        setDrawerOpen(false)
    }

    useEffect(() => {
        if (!toUser) return;

        if (userChats) {
            const myChats = userChats.filter((chat) => chat.sender_id === currentUser.id);
            const today = new Date().toLocaleDateString();
            const todayChats = myChats.filter((chat) => {
                const chatDate = new Date(chat.updated_at).toLocaleDateString();
                return chatDate === today;
            });
            setTodayMsgs(todayChats.length)
            if (currentUser.is_subscribe) {
                setIsAllowed(true);
            } else if (todayChats.length <= 3) {
                setIsAllowed(true);
            } else {
                setIsAllowed(false);
            }
        }

    }, [toUser, userChats, currentUser.is_subscribe])

    useEffect(() => {
        if (currentUser.is_subscribe) {
            setIsAllowed(true);
        } else if (todayMsgs < 3) {
            setIsAllowed(true)
        } else {
            setIsAllowed(false);
        }
    }, [todayMsgs])


    return (
        <div className="flex w-full md:w-[calc(100%-350px)] lg:w-[calc(100%-400px)] h-full flex-col">
            {toUser ? (
                <div className='w-full h-full flex'>
                    <div className='w-full  2xl:w-[calc(100%-400px)]'>
                        <ChatHeader toUser={toUser} setShowMobileChatContent={setShowMobileChatContent} setToUser={setToUser} setShowMobileProfile={setShowMobileProfile} setDrawerOpen={setDrawerOpen} />
                        <AllMessages chats={userChats.filter(
                            message =>
                                (message.sender_id === currentUser.id && message.receiver_id === toUser.id) ||
                                (message.sender_id === toUser.id && message.receiver_id === currentUser.id)
                        )} toUser={toUser} currentUser={currentUser} socket={socket} setTodayMsgs={setTodayMsgs} />
                        <MessageInput socket={socket} toUser={toUser} currentUser={currentUser} isAllowed={isAllowed} />
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

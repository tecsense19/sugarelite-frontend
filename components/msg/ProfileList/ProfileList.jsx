import { Suspense, useEffect, useState } from "react"
import Profiles from "./Profiles"
import TopNav from "./TopNav"
import { useStore } from "@/store/store"


const ProfileList = ({ profileList, setToUser, socket, currentUser, toUser }) => {

    const [unReadCount, setUnReadCount] = useState(0)
    const [unReadUsers, setUnreadUsers] = useState([])
    const [profiles, setProfiles] = useState(profileList)

    const { state: { chatProfileState }, dispatch } = useStore()

    useEffect(() => {
        const item = chatProfileState[chatProfileState.length - 1];
        if (item && item.type === "socket") {
            const existingUserIndex = profiles.findIndex(i => i.user.id === item.obj.receiver_id)
            if (existingUserIndex !== -1) {
                const newList = [...profiles];
                newList[existingUserIndex].latestMsg = item.obj;
                const updatedUser = newList.splice(existingUserIndex, 1)[0];
                newList.unshift(updatedUser);
                setProfiles(newList);
            } else {
                const remainUsers = profiles.filter(i => i.user.id !== item.obj.sender_id);
                const update = {
                    user: item.user,
                    latestMsg: item.obj
                };
                setProfiles([update, ...remainUsers]);
            }
        } else if (item && item.type === "normal") {
            const existingUserIndex = profiles.findIndex(i => i.user.id === item.obj.receiver_id);
            if (existingUserIndex !== -1) {
                const newList = [...profiles];
                const updatedUser = newList.splice(existingUserIndex, 1)[0];
                newList.unshift(updatedUser);
                setProfiles(newList);
                if (window.innerWidth >= 768) {
                    setToUser(updatedUser.user)
                }
            } else {
                const remainUsers = profiles.filter(i => i.user.id !== item.obj.sender_id);
                const update = {
                    user: item.user,
                    latestMsg: item.obj
                };
                setProfiles([update, ...remainUsers]);
                if (window.innerWidth >= 768) {
                    setToUser(update.user)
                }
            }
        }

    }, [chatProfileState])


    useEffect(() => {
        if (!socket) return;

        const receiveMessageHandler = (obj) => {
            const { msg, user } = obj
            if (msg.receiver_id === currentUser.id) {
                if (msg.type === "regular") {
                    dispatch({ type: "Add_Profile", payload: { obj: msg, type: "socket", user: user } });
                    dispatch({ type: "Add_Message", payload: msg })
                    if (toUser?.id !== msg.sender_id) {
                        setUnReadCount((prev) => prev + 1);
                        setUnreadUsers(prev => {
                            if (prev.indexOf(msg.sender_id) === -1) {
                                return [...prev, msg.sender_id];
                            }
                            return prev;
                        })
                    }
                } else if (msg.type === "edited") {
                    dispatch({ type: "Edit_Message", payload: msg })
                    dispatch({ type: "Add_Profile", payload: { obj: msg, type: "socket", user: user } });
                }
            } else if (msg.sender_id === currentUser.id) {
                if (msg.type === "regular") {
                    dispatch({ type: "Add_Profile", payload: { obj: msg, type: "socket", user: user } });
                    dispatch({ type: "Add_Message", payload: msg })
                } else if (msg.type === "edited") {
                    dispatch({ type: "Edit_Message", payload: msg })
                    dispatch({ type: "Add_Profile", payload: { obj: msg, type: "socket", user: user } });
                }
            }
        };

        const deleteMsgHandler = (obj) => {
            if (obj.receiver_id === currentUser.id || obj.sender_id === currentUser.id) {
                // dispatch({ type: "Delete_Message", payload: obj })
                dispatch({ type: "Edit_Message", payload: obj })
            }
        }

        socket.on("receive-message", receiveMessageHandler);
        socket.on("message-deleted", deleteMsgHandler)

        return () => {
            socket.off("receive-message", receiveMessageHandler);
            socket.off("message-deleted", deleteMsgHandler)
        };
    }, [socket, setUnReadCount, toUser]);

    useEffect(() => {
        const arr = unReadUsers.filter((i) => i !== toUser.id)
        setUnreadUsers(arr)
        setUnReadCount(0)
    }, [toUser])


    return (
        <div className='w-full md:w-[350px] lg:w-[400px] bg-primary-dark-3 h-full py-[14px] md:py-[30px]'>
            <TopNav profileList={profiles} setToUser={setToUser} />
            <Profiles profileList={profiles} setToUser={setToUser} unReadCount={unReadCount} unReadUsers={unReadUsers} />
        </div>
    )
}

export default ProfileList
import React, { useCallback, useEffect, useState } from 'react'
import TopNav from './TopNav'
import Profiles from './Profiles'
import { useStore } from '@/store/store'

const ProfileList = ({ currentUser, toUser, unReadCount, allUsers, myChats, profileList, setProfiles }) => {
    const { state: { chatProfileState, newMsgState }, dispatch } = useStore()
    // const [profiles, setProfiles] = useState([])

    useEffect(() => {
        const myChatsWithProfiles = chatProfileState.map(profileID => {
            const profile = allUsers.find(user => user.id === profileID.id);
            const conversation = myChats.filter(chat => chat.sender_id === profileID.id || chat.receiver_id === profileID.id);
            conversation.sort((a, b) => a.id - b.id);
            let messages;
            if (conversation.length > 0) {
                messages = conversation[conversation.length - 1];
            } else {
                messages = { milisecondtime: profileID.milisecondtime };
            }

            return {
                profile,
                messages: { ...messages, milisecondtime: parseInt(messages.milisecondtime) }
            };
        });
        setProfiles(myChatsWithProfiles);
    }, [chatProfileState, myChats, allUsers]);

    const addNewMessageToConversation = useCallback((message, profile) => {
        if (message) {
            setProfiles(prevProfiles => {
                return prevProfiles.map(p => (p.profile.id === profile.profile.id ? { ...p, messages: message } : p));
            });
        } else {
            setProfiles((prev) => [profile, ...prev])
        }
    }, []);

    useEffect(() => {
        if (newMsgState.length) {
            const latestMsg = newMsgState[newMsgState.length - 1];
            const profile = profileList.find(i => i.profile.id === latestMsg.receiver_id);
            if (!profile) {
                const findProfile = allUsers.find(i => i.id === latestMsg.sender_id)
                if (findProfile) {
                    dispatch({ type: "Add_Profile", payload: { id: findProfile.id, milisecondtime: latestMsg.milisecondtime } })
                }
            } else {
                if (!profile.messages || latestMsg.id >= profile.messages.id) {
                    addNewMessageToConversation(latestMsg, profile);
                } else if (!profile.messages.id) {
                    addNewMessageToConversation(latestMsg, profile);
                }
            }
        }
    }, [newMsgState]);

    return (
        <div className='w-full md:w-[350px] lg:w-[400px] bg-primary-dark-3 h-full py-[14px] md:py-[30px]'>
            <TopNav profileList={profileList.sort((a, b) => b.messages.milisecondtime - a.messages.milisecondtime)} />
            <Profiles profileList={profileList.sort((a, b) => b.messages.milisecondtime - a.messages.milisecondtime)} unReadCount={unReadCount} />
        </div>
    )
}

export default ProfileList
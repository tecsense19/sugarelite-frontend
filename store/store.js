"use client"
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { parseCookies } from 'nookies';
import CryptoJS from "crypto-js"

const initialState = {
  isOpenMobileNavbar: false,
};

const reducer = (state, action) => {
  switch (action.type) {
    case true:
      return { ...state, isOpenMobileNavbar: true };
    case false:
      return { ...state, isOpenMobileNavbar: false };
    default:
      return state;
  }
};

const filterReducer = (state, action) => {
  switch (action.type) {
    case 'Filter_Open':
      return { ...state, isFilterOpen: true };
    case 'Filter_Close':
      return { ...state, isFilterOpen: false };
    default:
      return state;
  }
}

const currentUserReducer = (state, action) => {
  switch (action.type) {
    case 'Current_User':
      return action.payload;
    default:
      return state;
  }
}

const messageToReducer = (state, action) => {
  switch (action.type) {
    case 'Message_To':
      return action.payload
    default:
      return state;
  }
}

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'Open_Notification':
      return action.payload;
    case 'Close_Notification':
      return action.payload;
    default:
      return state;
  }
}

const accessDecisionReducer = (state, action) => {
  switch (action.type) {
    case 'Add_Decision_User':
      const { data } = action.payload;
      const index = state.findIndex(profile => profile.data.id === data.id);
      if (index !== -1) {
        const newState = [...state];
        newState[index] = action.payload;
        return newState;
      } else {
        return [...state, action.payload];
      }
    default:
      return state;
  }
}

const chatProfileReducer = (state, action) => {
  switch (action.type) {
    case 'Add_Profile':
      const newProfile = action.payload.id;
      const existingProfileIndex = state.findIndex(profile => profile.id === newProfile);
      if (existingProfileIndex !== -1) {
        return state;
      } else {
        return [action.payload, ...state];
      }
    default:
      return state;
  }
}

const newMsgReducer = (state, action) => {
  switch (action.type) {
    case 'Add_Message':
      const newMsg = action.payload;
      const existingMsgIndex = state.findIndex(msg => msg.id === newMsg.id);
      if (existingMsgIndex !== -1) {
        const updatedState = state.filter((_, index) => index !== existingMsgIndex);
        return [...updatedState, newMsg];
      } else {
        return [...state, newMsg];
      }
    default:
      return state;
  }
}

const editOrDeleteReducer = (state, action) => {
  switch (action.type) {
    case 'Edit_Message':
      const newMsg = action.payload;
      const existingMsgIndex = state.findIndex(msg => msg.id === newMsg.id);
      if (existingMsgIndex !== -1) {
        const updatedState = [...state];
        updatedState[existingMsgIndex] = newMsg;
        return updatedState;
      } else {
        return [...state, action.payload];
      }
    default:
      return state;
  }
}

const blockedUsers = (state, action) => {
  switch (action.type) {
    case 'Add_Blocked_User':
      const newUser = action.payload;
      const existingMsgIndex = state.findIndex(msg => msg.receiver_id === newUser.receiver_id);
      if (existingMsgIndex !== -1) {
        const updatedState = [...state];
        updatedState[existingMsgIndex] = newUser;
        return updatedState;
      } else {
        return [...state, action.payload];
      }
    default:
      return state;
  }
}

const notifyReducer = (state, action) => {
  switch (action.type) {
    case "Add_Msg_Badge":
      return { ...state, msg: action.payload }
    case "Add_Notification_Badge":
      return { ...state, notify: action.payload }
    default:
      return state;
  }
}

const sideDarwerReducer = (state, action) => {
  switch (action.type) {
    case 'Show_Menu':
      return true
    case 'Close_Menu':
      return false
    default:
      return state;
  }
}

const onlineUsersReducer = (state, action) => {
  switch (action.type) {
    case "Update_Online_Users":
      return action.payload
    default:
      return state;
  }
}

const chatPartnerListReducer = (state, action) => {
  switch (action.type) {
    case "Add_Partner":
      const id = action.payload.sender_id
      const findIdIndex = state.findIndex(i => i.sender_id === id);
      if (findIdIndex !== -1) {
        const newState = [...state];
        if (action.payload.type === "closed") {
          newState[findIdIndex] = { ...state[findIdIndex], type: "closed" }
          return newState;
        }
        newState[findIdIndex] = action.payload
        return newState;
      } else {
        return [...state, action.payload];
      }
    default:
      return state;
  }
}

const readMsgsReducer = (state, action) => {
  switch (action.type) {
    case 'Add_Read_Message':
      const newUser = action.payload;
      const existingMsgIndex = state.findIndex(msg => msg === newUser);
      if (existingMsgIndex !== -1) {
        const updatedState = [...state];
        updatedState[existingMsgIndex] = newUser;
        return updatedState;
      } else {
        return [...state, action.payload];
      }
    default:
      return state;
  }
}

const friendsListReducer = (state, action) => {
  switch (action.type) {
    case "Add_Friend":
      return [...state, action.payload]
    default:
      return state;
  }
}

// const notificationsReducer = (state = { albumNotifications: [], friendRequests: [] }, action) => {
//   switch (action.type) {
//     case "Add_Album_Notification":
//       return { ...state, albumNotifications: [...state.albumNotifications, action.payload] };
//     case "Remove_Album_Notification":
//       return { ...state, albumNotifications: state.albumNotifications.filter(notification => notification.id !== action.payload.id) };
//     case "Add_Friend_Request":
//       return { ...state, friendRequests: [...state.friendRequests, action.payload] };
//     case "Remove_Friend_Request":
//       return { ...state, friendRequests: state.friendRequests.filter(request => request.id !== action.payload.id) };
//     default:
//       return state;
//   }
// }
const notificationsReducer = (state = { albumNotifications: [], friendRequests: [] }, action) => {
  switch (action.type) {
    case "Add_Album_Notification":
      if (state.albumNotifications.some(notification => notification.id === action.payload.id)) {
        return state;
      }
      return { ...state, albumNotifications: [...state.albumNotifications, action.payload] };
    case "Remove_Album_Notification":
      return { ...state, albumNotifications: state.albumNotifications.filter(notification => notification.id !== action.payload.id) };

    case "Add_Friend_Request":
      if (state.friendRequests.some(request => request.id === action.payload.id)) {
        return state;
      }
      return { ...state, friendRequests: [...state.friendRequests, action.payload] };
    case "Remove_Friend_Request":
      return {
        ...state,
        friendRequests: state.friendRequests.filter(request => request.id !== action.payload.id)
      };
    default:
      return state;
  }
}

const friendRequests = (state = { sendedRequests: [], receivedRequests: [], acceptedRequests: [] }, action) => {
  switch (action.type) {
    case "Add_Sended_Request":
      if (state.sendedRequests.some(request => request.id === action.payload.id)) {
        return state;
      }
      return { ...state, sendedRequests: [...state.sendedRequests, action.payload] }
    case "Remove_Sended_Request":
      return { ...state, sendedRequests: state.sendedRequests.filter(request => request.id !== action.payload.id) };
    case "Add_Received_Request":
      if (state.receivedRequests.some(request => request.id === action.payload.id)) {
        return state;
      }
      return { ...state, receivedRequests: [...state.receivedRequests, action.payload] };
    case "Remove_Received_Request":
      return { ...state, receivedRequests: state.receivedRequests.filter(request => request.id !== action.payload.id) };
    case "Add_Accepted_Request":
      if (state.acceptedRequests.some(request => request.id === action.payload.id)) {
        return state;
      }
      return { ...state, acceptedRequests: [...state.acceptedRequests, action.payload] };
    case "Remove_Accepted_Request":
      return { ...state, acceptedRequests: state.acceptedRequests.filter(request => request.id !== action.payload.id) };
    default:
      return state;
  }
}

const supportMsgsReducer = (state, action) => {
  switch (action.type) {
    case "Add_Support_Message":
      return [...state, action.payload]
    default:
      return state;
  }
}

const StoreContext = createContext();

const rootReducer = ({ firstState, filterState, chatPartnerList, readMsgsState, supportMsgs, notificationState, friendsList, onlineUsers, sideMenu, userState, toMessageState, notifyBadgeState, notificationOpenState, messageUpdate, newMsgState, blockedUsersState, decisionState, chatProfileState, requestsState }, action) => {
  switch (action.type) {
    case 'Logout':
      return {
        firstState: initialState,
        filterState: { isFilterOpen: false },
        userState: null,
        toMessageState: "Admin",
        notificationOpenState: false,
        decisionState: [],
        chatProfileState: [],
        newMsgState: [],
        blockedUsersState: [],
        messageUpdate: [],
        notifyBadgeState: { msg: false, notify: false },
        sideMenu: false,
        onlineUsers: [],
        chatPartnerList: [],
        readMsgsState: [],
        friendsList: [],
        notificationState: { albumNotifications: [], friendRequests: [] },
        requestsState: { sendedRequests: [], receivedRequests: [], acceptedRequests: [] },
        supportMsgs: []
      };
    default:
      return {
        firstState: reducer(firstState, action),
        filterState: filterReducer(filterState, action),
        userState: currentUserReducer(userState, action),
        toMessageState: messageToReducer(toMessageState, action),
        notificationOpenState: notificationReducer(notificationOpenState, action),
        decisionState: accessDecisionReducer(decisionState, action),
        chatProfileState: chatProfileReducer(chatProfileState, action),
        newMsgState: newMsgReducer(newMsgState, action),
        blockedUsersState: blockedUsers(blockedUsersState, action),
        messageUpdate: editOrDeleteReducer(messageUpdate, action),
        notifyBadgeState: notifyReducer(notifyBadgeState, action),
        sideMenu: sideDarwerReducer(sideMenu, action),
        onlineUsers: onlineUsersReducer(onlineUsers, action),
        chatPartnerList: chatPartnerListReducer(chatPartnerList, action),
        readMsgsState: readMsgsReducer(readMsgsState, action),
        friendsList: friendsListReducer(friendsList, action),
        notificationState: notificationsReducer(notificationState, action),
        requestsState: friendRequests(requestsState, action),
        supportMsgs: supportMsgsReducer(supportMsgs, action)
      };
  }
};

export const StoreProvider = ({ children }) => {

  const token = parseCookies("user")?.user
  let userId;

  if (token) {
    const bytes = CryptoJS.AES.decrypt(token, 'SecretKey');
    userId = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  const [state, dispatch,] = useReducer(rootReducer, {
    firstState: initialState,
    filterState: {
      isFilterOpen: false,
    },
    userState: null,
    toMessageState: "Admin",
    notificationOpenState: false,
    decisionState: [],
    chatProfileState: [],
    newMsgState: [],
    blockedUsersState: [],
    messageUpdate: [],
    notifyBadgeState: { msg: false, notify: false },
    sideMenu: false,
    onlineUsers: [],
    chatPartnerList: [],
    readMsgsState: [],
    friendsList: [],
    notificationState: { albumNotifications: [], friendRequests: [] },
    requestsState: { sendedRequests: [], receivedRequests: [], acceptedRequests: [] },
    supportMsgs: []
  });

  // useEffect(() => {
  //   if (userId) {
  //     connectSocket(userId)
  //   }
  // }, [])

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

"use client"
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { parseCookies } from 'nookies';
import CryptoJS from "crypto-js"
import { io } from 'socket.io-client';
import { socket_server } from '@/app/lib/helpers';

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

const messageToReducer = (state = [], action) => {
  switch (action.type) {
    case 'Message_To':
      return [...state, action.payload]
    default:
      return state;
  }
}

const chatReducer = (state, action) => {
  switch (action.type) {
    case 'Update_Chats':
      return [...state, action.payload]
    default:
      return state;
  }
}

const allUsersDataReducer = (state, action) => {
  switch (action.type) {
    case 'all_users_data':
      // console.log(action.payload);
      return action.payload;
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

const accessPendingReducer = (state, action) => {
  switch (action.type) {
    case 'Add_User':
      return [...state, action.payload];
    case "Remove_User":
      return state.filter(user => user !== action.payload.id);
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
      const newProfile = action.payload.obj;
      const existingProfileIndex = state.findIndex(profile => profile.obj.id === newProfile.id);
      if (existingProfileIndex !== -1) {
        const newState = [...state];
        newState[existingProfileIndex] = action.payload;
        return newState;
      } else {
        return [...state, action.payload];
      }
    default:
      return state;
  }
}

const newMsgReducer = (state, action) => {
  switch (action.type) {
    case 'Add_Message':
      const newMsg = action.payload;
      if (newMsg.id) {
        const existingMsgIndex = state.findIndex(msg => msg.id === newMsg.id);
        if (existingMsgIndex !== -1) {
          const updatedState = state.filter((_, index) => index !== existingMsgIndex);
          return [...updatedState, newMsg];
        } else {
          return [...state, newMsg];
        }
      } else {
        const existingMsgIndex = state.findIndex(msg => msg.receiver_id === newMsg.receiver_id);
        if (existingMsgIndex !== -1) {
          const updatedState = state.filter((_, index) => index !== existingMsgIndex);
          return [...updatedState, newMsg];
        } else {
          return [...state, newMsg];
        }
      }
    default:
      return state;
  }
}

// const editOrDeleteReducer = (state, action) => {
//   switch (action.type) {
//     case 'Edit_Message':
//       const editedMessage = action.payload;
//       const existingMessageIndex = state.edit.findIndex(message => message.id === editedMessage.id);
//       if (existingMessageIndex !== -1) {
//         const updatedEdit = [...state.edit];
//         updatedEdit[existingMessageIndex] = editedMessage;
//         return {
//           ...state,
//           edit: updatedEdit
//         };
//       } else {
//         return {
//           ...state,
//           edit: [...state.edit, editedMessage]
//         };
//       }
//     case "Delete_Message":
//       const deletedMsg = action.payload;
//       const deletedMessageIndex = state.deleted.findIndex(message => message.id === deletedMsg.id);
//       if (deletedMessageIndex !== -1) {
//         const updatedEdit = [...state.deleted];
//         updatedEdit[deletedMessageIndex] = deletedMsg;
//         return {
//           ...state,
//           deleted: updatedEdit
//         };
//       } else {
//         return {
//           ...state, deleted: [...state.deleted, action.payload]
//         };
//       }
//     default:
//       return state;
//   }
// };

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


const StoreContext = createContext();

const rootReducer = ({ firstState, filterState, userState, toMessageState, notifyBadgeState, allUsersState, chatsState, notificationOpenState, messageUpdate, newMsgState, blockedUsersState, accessPendingState, decisionState, chatProfileState }, action) => ({
  firstState: reducer(firstState, action),
  filterState: filterReducer(filterState, action),
  userState: currentUserReducer(userState, action),
  toMessageState: messageToReducer(toMessageState, action),
  allUsersState: allUsersDataReducer(allUsersState, action),
  chatsState: chatReducer(chatsState, action),
  notificationOpenState: notificationReducer(notificationOpenState, action),
  accessPendingState: accessPendingReducer(accessPendingState, action),
  decisionState: accessDecisionReducer(decisionState, action),
  chatProfileState: chatProfileReducer(chatProfileState, action),
  newMsgState: newMsgReducer(newMsgState, action),
  blockedUsersState: blockedUsers(blockedUsersState, action),
  messageUpdate: editOrDeleteReducer(messageUpdate, action),
  notifyBadgeState: notifyReducer(notifyBadgeState, action)
});



export const StoreProvider = ({ children }) => {

  const token = parseCookies("user")?.user
  let user;

  if (token) {
    const bytes = CryptoJS.AES.decrypt(token, 'SecretKey');
    user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  const [state, dispatch,] = useReducer(rootReducer, {
    firstState: initialState,
    filterState: {
      isFilterOpen: false,
    },
    userState: user ? user : null,
    toMessageState: [],
    allUsersState: null,
    chatsState: [],
    notificationOpenState: false,
    accessPendingState: [],
    decisionState: [],
    chatProfileState: [],
    newMsgState: [],
    blockedUsersState: [],
    messageUpdate: [],
    notifyBadgeState: { msg: false, notify: false }
  });

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

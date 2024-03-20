"use client"
import React, { createContext, useContext, useReducer } from 'react';
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

const accessDecisionReducer = (state = [], action) => {
  // console.log(action.payload)
  switch (action.type) {
    case 'Add_Decision_User':
      const existingIndex = state.findIndex(item => item.userId === action.payload.userId && item.senderId === action.payload.senderId);

      if (existingIndex !== -1) {
        // If the object exists, update it
        const newState = [...state];
        newState[existingIndex] = action.payload;
        return newState;
      } else {
        // If the object doesn't exist, add it
        return [...state, action.payload];
      }
    default:
      return state;
  }
}



const StoreContext = createContext();

const rootReducer = ({ firstState, filterState, userState, toMessageState, allUsersState, chatsState, notificationOpenState, accessPendingState, decisionState }, action) => ({
  firstState: reducer(firstState, action),
  filterState: filterReducer(filterState, action),
  userState: currentUserReducer(userState, action),
  toMessageState: messageToReducer(toMessageState, action),
  allUsersState: allUsersDataReducer(allUsersState, action),
  chatsState: chatReducer(chatsState, action),
  notificationOpenState: notificationReducer(notificationOpenState, action),
  accessPendingState: accessPendingReducer(accessPendingState, action),
  decisionState: accessDecisionReducer(decisionState, action)
});


export const StoreProvider = ({ children }) => {

  const token = parseCookies("user")?.user
  let user;

  if (token) {
    const bytes = CryptoJS.AES.decrypt(token, 'SecretKey');
    user = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  }

  const [state, dispatch] = useReducer(rootReducer, {
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
    decisionState: []
  });

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
};

export const useStore = () => useContext(StoreContext);

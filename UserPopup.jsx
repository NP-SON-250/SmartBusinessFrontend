import React, { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [usersPopup, setUsersPopup] = useState(false);

  const handleUsersPopup = () => {
    setUsersPopup(!usersPopup);
  };

  return (
    <PopupContext.Provider value={{ usersPopup, handleUsersPopup }}>
      {children}
    </PopupContext.Provider>
  );
};

export const userPopup = () => {
  return useContext(PopupContext);
};

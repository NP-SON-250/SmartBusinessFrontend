import React, { createContext, useContext, useState } from "react";

const PopupContext = createContext();

export const PopupProvider = ({ children }) => {
  const [orderPopup, setOrderPopup] = useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };

  const handleOrderPopupClose = () => {
    setOrderPopup(orderPopup);
  };


  return (
    <PopupContext.Provider value={{ orderPopup, handleOrderPopup }}>
      {children}
    </PopupContext.Provider>
    
  );
};

export const usePopup = () => {
  return useContext(PopupContext);
};

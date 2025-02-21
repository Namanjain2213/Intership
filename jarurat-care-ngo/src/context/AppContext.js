import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <AppContext.Provider value={{ searchTerm, setSearchTerm }}>
      {children}
    </AppContext.Provider>
  );
};


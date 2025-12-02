"use client";

import { createContext, useContext, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("John Doe");
  const [selectedDepartment, setSelectedDepartment] = useState("");

  return (
    <AppContext.Provider
      value={{
        theme,
        setTheme,
        isLoggedIn,
        setIsLoggedIn,
        userName,
        setUserName,
        selectedDepartment,
        setSelectedDepartment,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}

export { AppContext };

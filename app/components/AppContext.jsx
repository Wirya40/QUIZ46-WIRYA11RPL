"use client";

import { createContext, useState } from "react";

export const AppContext = createContext();

export default function AppProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [userName, setUserName] = useState("John");
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

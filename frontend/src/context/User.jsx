import { createContext, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  return <UserContext.Provider value={{}}>{children}</UserContext.Provider>;
};

export const UserData = () => useContext(UserContext);

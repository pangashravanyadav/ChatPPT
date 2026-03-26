import { createContext, useContext, useState } from "react";

// 1. Create the context
const AuthContext = createContext();

// 2. Provider — wraps your whole app, shares auth state
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  // Save user + token to state and localStorage
  const login = (userData, token) => {
    setUser(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", token);
  };

  // Clear everything on logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Custom hook — easy way to use auth anywhere
export const useAuth = () => useContext(AuthContext);
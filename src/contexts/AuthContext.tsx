import { createContext, useContext, useState, type ReactNode } from "react";

interface User {
  email: string;
  name: string;
  hometown: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, _password: string) => boolean;
  signup: (email: string, password: string, name: string) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("doomswap_user");
    return stored ? JSON.parse(stored) : null;
  });

  const login = (email: string, _password: string): boolean => {
    const stored = localStorage.getItem("doomswap_accounts");
    const accounts: Record<string, { password: string; name: string }> =
      stored ? JSON.parse(stored) : {};

    if (accounts[email] && accounts[email].password === _password) {
      const u: User = { email, name: accounts[email].name, hometown: "St. Petersburg, FL" };
      setUser(u);
      localStorage.setItem("doomswap_user", JSON.stringify(u));
      return true;
    }
    return false;
  };

  const signup = (email: string, password: string, name: string): boolean => {
    const stored = localStorage.getItem("doomswap_accounts");
    const accounts: Record<string, { password: string; name: string }> =
      stored ? JSON.parse(stored) : {};
    if (accounts[email]) return false;
    accounts[email] = { password, name };
    localStorage.setItem("doomswap_accounts", JSON.stringify(accounts));
    const u: User = { email, name, hometown: "St. Petersburg, FL" };
    setUser(u);
    localStorage.setItem("doomswap_user", JSON.stringify(u));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("doomswap_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
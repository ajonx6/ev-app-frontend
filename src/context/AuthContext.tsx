import { createContext, useContext, useState } from "react";

export interface AuthUser {
  id: number;
  email: string;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (id: number, email: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const savedId = localStorage.getItem("userId");
    const savedEmail = localStorage.getItem("userEmail");

    if (savedId && savedEmail) {
      return { id: Number(savedId), email: savedEmail };
    }
    return null;
  });

  const login = (id: number, email: string) => {
    const newUser = { id, email };
    setUser(newUser);
    localStorage.setItem("userId", id.toString());
    localStorage.setItem("userEmail", email);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
    localStorage.removeItem("userEmail");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

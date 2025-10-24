"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { mockUsers } from "@/lib/users";
import { useRouter } from "next/navigation";

type UserData = {
  id: number;
  name: string;
  email: string;
  username: string;
  role: string;
};

type AuthUser = UserData | null;


interface AuthContextType {
  user: AuthUser;
  login: (email: string, password: string) => boolean;
  register: (data: Omit<UserData,"id" | "role"> & { password: string }) => boolean;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<AuthUser>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) setUser(JSON.parse(storedUser));
  }, []);

  const login = (email: string, password: string) => {
    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      localStorage.setItem("user", JSON.stringify(foundUser));
      setUser(foundUser);
      router.push(foundUser.role === "admin" ? "/admin" : "/request");
      return true;
   } else {
    alert("Invalid email or password");
    return false;
  }
  };

  const register = (data: any) => {
     const existingUser = mockUsers.find((u) => u.email === data.email);
  if (existingUser) {
    alert("Email already registered");
    return false;
  }
    const newUser = { id: Date.now(), ...data, role: "user" };
    localStorage.setItem("user", JSON.stringify(newUser));
    setUser(newUser);
    router.push("/dashboard");
    return true;
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};

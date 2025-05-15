// src/context/AuthContext.tsx
"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, User } from "firebase/auth";
import { auth } from "@/config/firebase";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  idUsuario: number | null;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  idUsuario: null,
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [idUsuario, setIdUsuario] = useState<number | null>(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);

      if (firebaseUser?.email) {
        try {
          const res = await fetch(
            `http://localhost:3001/api/usuarios?correo=${encodeURIComponent(firebaseUser.email)}`,
          );
          if (!res.ok) throw new Error("Usuario no encontrado");
          const data = await res.json();
          setIdUsuario(data.id);
        } catch (err) {
          console.error("Error al obtener ID de usuario:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, loading, idUsuario }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

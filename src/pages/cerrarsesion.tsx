"use client";

import { useEffect } from "react";
import { cerrarSesion } from "@/config/auth";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    cerrarSesion()
      .then(() => {
        console.log("Sesión cerrada");
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error al cerrar sesión:", error);
      });
  }, []);

  return (
    <div className="flex items-center justify-center h-screen">
      <p className="text-default-600 text-lg">Cerrando sesión...</p>
    </div>
  );
}

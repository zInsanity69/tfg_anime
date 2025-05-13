// src/App.tsx
import { Route, Routes } from "react-router-dom";
import PrivateRoute from "@/components/PrivateRoute";

import IndexPage from "@/pages/index";
import AboutPage from "@/pages/PublicManga";
import MangaPage from "@/pages/mangas";
import Registro from "./pages/Login/registro";
import Login from "./pages/Login/login";
import Config from "./pages/config";
import PublicManga from "./pages/PublicManga.tsx";
import MangaDetail from "./pages/[id]";
import WishlistPage from "./pages/wishlist.tsx";
import VentasPage from "./pages/ventas.tsx";
import CartPage from "./pages/carrito.tsx";
import Logout from "./pages/cerrarsesion.tsx";
import RecuperarContrasena from "./pages/recuperarConstraseña.tsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/mangas" element={<MangaPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/login" element={<Login />} />
      <Route path="/cerrarsesion" element={<Logout />} />
      <Route path="/recuperar" element={<RecuperarContrasena />} />

      {/* RUTAS PROTEGIDAS */}
      <Route
        path="/config"
        element={
          <PrivateRoute>
            <Config />
          </PrivateRoute>
        }
      />
      <Route
        path="/plublicarManga"
        element={
          <PrivateRoute>
            <PublicManga />
          </PrivateRoute>
        }
      />
      <Route
        path="/ventas"
        element={
          <PrivateRoute>
            <VentasPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/wishlist"
        element={
          <PrivateRoute>
            <WishlistPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/carrito"
        element={
          <PrivateRoute>
            <CartPage />
          </PrivateRoute>
        }
      />

      {/* RUTA DINÁMICA */}
      <Route path="/manga/:id" element={<MangaDetail />} />
    </Routes>
  );
}

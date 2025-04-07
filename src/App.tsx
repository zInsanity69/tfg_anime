import { Route, Routes } from "react-router-dom";

import IndexPage from "@/pages/index";
import AboutPage from "@/pages/about";
import MangaPage from "@/pages/mangas";
import Registro from "./pages/Login/registro";

function App() {
  return (
    <Routes>
      <Route element={<IndexPage />} path="/" />
      <Route element={<MangaPage />} path="/manga" />
      <Route element={<AboutPage />} path="/about" />
      <Route element={<Registro />} path="/registro" />
    </Routes>
  );
}

export default App;

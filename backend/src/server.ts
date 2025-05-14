import express from "express";
import cors from "cors";
import usuariosRouter from "./routes/usuarios";
import mangasRouter from "./routes/mangas";
import favoritosRouter from "./routes/favoritos";
import pedidosRouter from "./routes/pedidos";
import detallesRouter from "./routes/detalles";
import imagenesRouter from "./routes/imagenes";

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use("/api/usuarios", usuariosRouter);
app.use("/api/mangas", mangasRouter);
app.use("/api/favoritos", favoritosRouter);
app.use("/api/pedidos", pedidosRouter);
app.use("/api/detalles", detallesRouter);
app.use("/api/imagenes", imagenesRouter);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

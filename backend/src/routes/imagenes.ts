import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const router = express.Router();

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    const dir = path.join(__dirname, "..", "..", "public", "uploads");
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: (_req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// ✅ GET: imágenes de un manga específico
router.get("/:id", async (req, res) => {
  const id_manga = parseInt(req.params.id);
  if (isNaN(id_manga)) {
    return res.status(400).json({ error: "ID inválido" });
  }

  try {
    const imagenes = await prisma.img_mangas.findMany({
      where: { id_manga },
    });
    res.json(imagenes);
  } catch (err) {
    console.error("Error al obtener imágenes:", err);
    res.status(500).json({ error: "Error al obtener imágenes" });
  }
});

// POST: subir imagen
router.post("/", upload.single("img"), async (req, res) => {
  const { id_manga } = req.body;
  const file = req.file;

  if (!file || !id_manga) {
    return res.status(400).json({ error: "Falta imagen o id_manga" });
  }

  const url_img = `/uploads/${file.filename}`;

  try {
    const img = await prisma.img_mangas.create({
      data: { id_manga: parseInt(id_manga), url_img },
    });

    res.status(201).json(img);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al guardar imagen" });
  }
});

export default router;

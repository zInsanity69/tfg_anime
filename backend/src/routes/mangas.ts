import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET todos los mangas
router.get("/", async (_, res) => {
  try {
    const mangas = await prisma.mangas.findMany({
      include: { img_mangas: true },
    });
    res.json(mangas);
  } catch (err) {
    console.error("Error al obtener mangas:", err);
    res.status(500).json({ error: "Error al obtener mangas" });
  }
});

// GET un manga por ID
router.get("/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).json({ error: "ID inválido" });

  try {
    const manga = await prisma.mangas.findUnique({
      where: { id },
      include: { img_mangas: true },
    });
    if (!manga) return res.status(404).json({ error: "Manga no encontrado" });
    res.json(manga);
  } catch (err) {
    console.error("Error al obtener manga:", err);
    res.status(500).json({ error: "Error al obtener manga" });
  }
});

// POST nuevo manga
router.post("/", async (req, res) => {
  const {
    id_usuario,
    nombre,
    precio,
    cantidad,
    estado_manga,
    volumenes,
    informacion_vendedor,
    vendido,
  } = req.body;

  if (
    !id_usuario ||
    !nombre ||
    !precio ||
    !cantidad ||
    !estado_manga ||
    !volumenes ||
    !informacion_vendedor
  ) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const manga = await prisma.mangas.create({
      data: {
        id_usuario,
        nombre,
        precio,
        cantidad,
        estado_manga,
        volumenes,
        informacion_vendedor,
        vendido: vendido ?? false,
      },
    });

    res.status(201).json(manga);
  } catch (err) {
    console.error("Error al crear manga:", err);
    res.status(500).json({ error: "Error al crear manga" });
  }
});

export default router;

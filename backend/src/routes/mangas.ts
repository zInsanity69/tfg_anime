import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// GET todos los mangas
router.get("/", async (_, res) => {
  const mangas = await prisma.mangas.findMany({
    include: { img_mangas: true },
  });
  res.json(mangas);
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
    console.error(err);
    res.status(500).json({ error: "Error al crear manga" });
  }
});

export default router;

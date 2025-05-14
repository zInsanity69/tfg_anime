import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { id_manga, url_img } = req.body;

  if (!id_manga || !url_img) {
    return res.status(400).json({ error: "Faltan campos obligatorios" });
  }

  try {
    const img = await prisma.img_mangas.create({ data: { id_manga, url_img } });
    res.status(201).json(img);
  } catch (err) {
    res.status(500).json({ error: "Error al guardar imagen" });
  }
});

export default router;

import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { id_usuario, id_manga } = req.body;

  if (!id_usuario || !id_manga) {
    return res.status(400).json({ error: "Faltan campos" });
  }

  try {
    const fav = await prisma.favoritos.create({
      data: { id_usuario, id_manga },
    });
    res.status(201).json(fav);
  } catch (err) {
    res.status(500).json({ error: "Error al crear favorito" });
  }
});

export default router;

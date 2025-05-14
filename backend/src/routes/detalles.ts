import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { id_pedido, id_mangas } = req.body;

  if (!id_pedido || !id_mangas) {
    return res.status(400).json({ error: "Campos obligatorios faltantes" });
  }

  try {
    const detalle = await prisma.detalles_pedidos.create({
      data: { id_pedido, id_mangas },
    });

    res.status(201).json(detalle);
  } catch (err) {
    res.status(500).json({ error: "Error al crear detalle de pedido" });
  }
});

export default router;

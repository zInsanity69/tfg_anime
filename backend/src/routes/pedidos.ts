import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { id_usuario, id_vendedor, precio, estado, cantidad } = req.body;

  if (!id_usuario || !id_vendedor || !precio || !estado || !cantidad) {
    return res.status(400).json({ error: "Campos obligatorios faltantes" });
  }

  try {
    const pedido = await prisma.pedidos.create({
      data: {
        id_usuario,
        id_vendedor,
        precio,
        estado,
        cantidad,
        fecha: new Date().toISOString(), // Genera la fecha actual en formato ISO
      },
    });

    res.status(201).json(pedido);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear pedido" });
  }
});

export default router;

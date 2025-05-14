// src/routes/pedidos.ts
import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.post("/", async (req, res) => {
  const { id_usuario, id_vendedor, precio, estado, detalles } = req.body;

  // Validación básica
  if (
    !id_usuario ||
    !id_vendedor ||
    precio == null ||
    !estado ||
    !Array.isArray(detalles) ||
    detalles.length === 0
  ) {
    return res
      .status(400)
      .json({ error: "Faltan campos obligatorios o 'detalles' no válido" });
  }

  // Cada item de detalles debe tener id_mangas y fecha
  for (const det of detalles) {
    if (
      det.id_mangas == null ||
      typeof det.fecha !== "string" ||
      det.fecha.trim() === ""
    ) {
      return res
        .status(400)
        .json({ error: "Cada detalle debe incluir id_mangas y fecha" });
    }
  }

  try {
    const pedido = await prisma.pedidos.create({
      data: {
        id_usuario,
        id_vendedor,
        precio,
        estado,
        // Escritura anidada para insertar detalles_pedidos
        detalles_pedidos: {
          create: detalles.map((d: { id_mangas: number; fecha: string }) => ({
            id_mangas: d.id_mangas,
            fecha: d.fecha,
          })),
        },
      },
      include: {
        detalles_pedidos: true, // Devolver también los detalles recién creados
      },
    });

    res.status(201).json(pedido);
  } catch (err) {
    console.error("Error al crear pedido con detalles:", err);
    res.status(500).json({ error: "Error al crear pedido" });
  }
});

export default router;

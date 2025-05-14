import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const router = Router();
const prisma = new PrismaClient();

// 🔹 GET: Obtener usuario por correo (ahora solo con 'correo')
router.get("/usuarios", async (req: Request, res: Response) => {
  const rawCorreo = req.query.correo;

  const correo =
    typeof rawCorreo === "string"
      ? rawCorreo
      : Array.isArray(rawCorreo)
        ? rawCorreo[0]
        : undefined;

  if (!correo) {
    return res.status(400).json({ error: "Correo inválido" });
  }

  try {
    const usuario = await prisma.usuarios.findFirst({
      where: { correo },
    });

    if (!usuario) {
      return res.status(404).json({ error: "No encontrado" });
    }

    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar usuario" });
  }
});

// 🔹 POST: Crear usuario si no existe (solo con correo)
router.post("/usuarios", async (req, res) => {
  const { correo } = req.body;

  if (!correo) {
    return res.status(400).json({ error: "Correo requerido." });
  }

  try {
    const existe = await prisma.usuarios.findFirst({ where: { correo } });
    if (existe)
      return res.status(200).json({ message: "Ya existe", usuario: existe });

    const nuevo = await prisma.usuarios.create({ data: { correo } });
    res.status(201).json(nuevo);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al crear el usuario." });
  }
});

// 🔹 PUT: Actualizar o crear detalles de usuario
router.put("/usuarios/:id", async (req, res) => {
  const id_usuario = parseInt(req.params.id);
  const {
    nombre_usuario,
    nombre,
    apellido,
    telefono,
    pais,
    direccion,
    codigo_postal,
    url_avatar,
  } = req.body;

  try {
    const existente = await prisma.datos_usuario.findFirst({
      where: { id_usuario },
    });

    let datos;
    if (existente) {
      datos = await prisma.datos_usuario.update({
        where: { id: existente.id },
        data: {
          nombre_usuario,
          nombre,
          apellido,
          telefono,
          pais,
          direccion,
          codigo_postal,
          url_avatar,
        },
      });
    } else {
      datos = await prisma.datos_usuario.create({
        data: {
          id_usuario,
          nombre_usuario,
          nombre,
          apellido,
          telefono,
          pais,
          direccion,
          codigo_postal,
          url_avatar,
        },
      });
    }

    res.json(datos);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Error al actualizar los datos del usuario." });
  }
});

// 🔹 GET: Obtener datos de perfil
router.get("/usuarios/:id/detalles", async (req, res) => {
  const id_usuario = parseInt(req.params.id);

  try {
    const detalles = await prisma.datos_usuario.findFirst({
      where: { id_usuario },
    });

    if (!detalles) {
      return res.status(404).json({ error: "Detalles no encontrados" });
    }

    res.json(detalles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al obtener detalles" });
  }
});

export default router;

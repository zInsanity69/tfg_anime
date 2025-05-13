import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";

const router = Router();
const prisma = new PrismaClient();

router.get("/usuarios", async (req: Request, res: Response) => {
  const rawToken = req.query.token;

  const token =
    typeof rawToken === "string"
      ? rawToken
      : Array.isArray(rawToken)
        ? rawToken[0]
        : undefined;

  if (!token) {
    res.status(400).json({ error: "Token inválido" });
  }

  try {
    const usuario = await prisma.usuarios.findFirst({
      where: { token },
    });

    if (!usuario) {
      res.status(404).json({ error: "No encontrado" });
    }

    res.json(usuario);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Error al buscar usuario" });
  }
});

// 🔹 POST: Crear usuario si no existe
router.post("/usuarios", async (req, res) => {
  const { token, correo } = req.body;

  if (!token || !correo) {
    res.status(400).json({ error: "Token y correo requeridos." });
  }

  try {
    const existe = await prisma.usuarios.findFirst({ where: { token } });
    if (existe) res.status(200).json({ message: "Ya existe", usuario: existe });

    const nuevo = await prisma.usuarios.create({ data: { token, correo } });
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

export default router;

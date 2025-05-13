// src/pages/mangas.tsx
import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Divider,
  Button,
} from "@heroui/react";

interface Manga {
  title: string;
  genres: string[];
  img: string;
  price: number;
  description: string;
  condition: string;
  quantity: number;
}

export default function MangaPage() {
  const navigate = useNavigate();
  const { search: qs } = useLocation();
  const params = new URLSearchParams(qs);
  const genreParam = params.get("genre") || "Todos";

  const commonImg =
    "https://cdn.agapea.com/NORMA-EDITORIAL-S-A-/FIRE-FORCE-25-i7n22513263.jpg";

  // Lista inicial con quantity > 0
  const initialList: Manga[] = [
    {
      title: "One Piece",
      genres: ["Acción", "Aventura"],
      img: commonImg,
      price: 6.99,
      description:
        "Monkey D. Luffy se embarca en una épica aventura pirata en busca del One Piece.",
      condition: "Muy buen estado",
      quantity: 2,
    },
    {
      title: "Naruto",
      genres: ["Acción", "Shōnen"],
      img: commonImg,
      price: 5.5,
      description:
        "Naruto Uzumaki lucha por el reconocimiento de su aldea y sueña con ser Hokage.",
      condition: "Buen estado",
      quantity: 1,
    },
    // … puedes añadir más mangas aquí
  ];
  const [mangasList, setMangasList] = useState<Manga[]>(initialList);

  // Eliminar manga
  const handleDelete = (idxToRemove: number) => {
    setMangasList((prev) => prev.filter((_, idx) => idx !== idxToRemove));
  };

  // Total del carrito
  const total = mangasList.reduce((sum, m) => sum + m.price * m.quantity, 0);

  const truncateText = (text: string, max: number) =>
    text.length > max ? text.substring(0, max) + "…" : text;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center py-8 gap-8">
        <h1 className={`${title()} text-center`}>Tu Carrito</h1>

        {/* GRID DE TARJETAS */}
        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
          {mangasList.map((item, idx) => (
            <Card
              key={idx}
              isPressable
              shadow="sm"
              className="rounded-2xl overflow-hidden flex flex-col"
              onPress={() => navigate(`/manga/${idx}`)}
            >
              <CardBody className="flex flex-col items-center gap-4 p-4">
                <div className="w-32 h-48 overflow-hidden rounded-lg bg-default-200">
                  <Image
                    src={item.img}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="font-semibold text-lg">{item.title}</h2>
                <p className="text-default-500">
                  {truncateText(item.description, 80)}
                </p>
              </CardBody>

              <Divider />

              <CardFooter className="mt-auto flex flex-col gap-4 p-4">
                {/* Cantidad */}
                <div className="flex items-center justify-start gap-2 w-full">
                  <span className="text-default-500">Cantidad:</span>
                  <span>{item.quantity}</span>
                </div>

                {/* Subtotal + Eliminar */}
                <div className="flex justify-between items-center w-full">
                  <span className="font-medium">
                    Subtotal: {(item.price * item.quantity).toFixed(2)}€
                  </span>
                  <Button
                    variant="bordered"
                    color="danger"
                    size="sm"
                    onPress={() => handleDelete(idx)}
                  >
                    Eliminar
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {/* Total + Checkout */}
        <div className="w-full max-w-4xl px-4">
          <Divider />
          <div className="flex justify-between items-center py-4">
            <span className="font-semibold text-lg">Total:</span>
            <span className="font-semibold text-lg">{total.toFixed(2)}€</span>
          </div>
          <Button
            color="primary"
            className="w-full py-3"
            onPress={() => {
              /* lógica de checkout */
            }}
          >
            Checkout
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}

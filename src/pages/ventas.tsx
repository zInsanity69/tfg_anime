// src/pages/ventas.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Pagination,
  Button,
} from "@heroui/react";

export default function VentasPage() {
  const navigate = useNavigate();
  const commonImg =
    "https://cdn.agapea.com/NORMA-EDITORIAL-S-A-/FIRE-FORCE-25-i7n22513263.jpg";

  // Ejemplos de mangas que el usuario está vendiendo
  const ventas: Array<{
    title: string;
    volumes: number[];
    img: string;
    price: string;
    description: string;
    condition: string;
  }> = [
    // {
    //   title: "Tokyo Revengers",
    //   volumes: [1, 2, 3],
    //   img: commonImg,
    //   price: "8.50",
    //   description:
    //     "Takemichi viaja al pasado para salvar a su amigo y cambiar el destino de Tokyo Manji Gang.",
    //   condition: "Buen estado",
    // },
    // {
    //   title: "Chainsaw Man",
    //   volumes: [1],
    //   img: commonImg,
    //   price: "7.99",
    //   description:
    //     "Denji lucha contra demonios para pagar sus deudas convirtiéndose en el Cazador de Demonios más extraño: Chainsaw Man.",
    //   condition: "Como nuevo",
    // },
    // {
    //   title: "Spy x Family",
    //   volumes: [1, 2],
    //   img: commonImg,
    //   price: "6.75",
    //   description:
    //     "Un espía debe crear una familia falsa para su misión: una telepática y un asesino a sueldo completan el hogar.",
    //   condition: "Muy buen estado",
    // },
  ];

  // Paginación
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(ventas.length / ITEMS_PER_PAGE);
  const [page, setPage] = useState(1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentList = ventas.slice(start, start + ITEMS_PER_PAGE);

  // Si no hay ventas, mostrar mensaje y botón
  if (ventas.length === 0) {
    return (
      <DefaultLayout hideFooter>
        <section className="flex flex-col items-center justify-center px-4">
          <h1 className={`${title()} text-center mb-6`}>Mis ventas</h1>
          <p className="text-default-500 text-center mb-6">
            Aún no tienes ningún manga en venta.
          </p>
          <Button color="primary" onPress={() => navigate("/plublicarManga")}>
            Publicar mangas
          </Button>
        </section>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center py-8 gap-12">
        <h1 className={`${title()} text-center`}>Mis ventas</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 w-full max-w-6xl">
          {currentList.map((item, idx) => {
            const globalIndex = start + idx + 1;
            return (
              <Card
                key={globalIndex}
                isPressable
                shadow="sm"
                className="group flex flex-col h-96"
                onPress={() => navigate(`/manga/${globalIndex}`)}
              >
                <CardBody className="p-0 flex-shrink-0">
                  <div className="h-48 overflow-hidden rounded-t-lg">
                    <Image
                      alt={item.title}
                      src={item.img}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <p className="text-sm text-default-500">
                      {item.description.slice(0, 150)}…
                    </p>
                  </div>
                </CardBody>
                <CardFooter className="mt-auto flex flex-col gap-2 p-4 pt-0">
                  <div className="flex justify-between items-center">
                    <b>{item.title}</b>
                    <span className="text-default-500">{item.price}€</span>
                  </div>
                  <div className="flex justify-between text-xs text-default-400">
                    <span>Estado: {item.condition}</span>
                    <span>Volúmenes: {item.volumes.join(", ")}</span>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        <Pagination
          showControls
          initialPage={1}
          total={totalPages}
          onChange={(p) => setPage(p)}
        />
      </section>
    </DefaultLayout>
  );
}

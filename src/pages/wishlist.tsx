// src/pages/wishlist.tsx
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

export default function WishlistPage() {
  const navigate = useNavigate();
  const commonImg =
    "https://cdn.agapea.com/NORMA-EDITORIAL-S-A-/FIRE-FORCE-25-i7n22513263.jpg";

  // Tres ejemplos de mangas en la wishlist
  const wishlist: Array<{
    title: string;
    volumes: number[];
    img: string;
    price: string;
    description: string;
    condition: string;
  }> = [
    // {
    //   title: "One Piece",
    //   volumes: [1, 2, 3],
    //   img: commonImg,
    //   price: "6.99",
    //   description:
    //     "Monkey D. Luffy se embarca en una aventura pirata para encontrar el legendario tesoro One Piece y proclamarse Rey de los Piratas.",
    //   condition: "Muy buen estado",
    // },
    // {
    //   title: "Naruto",
    //   volumes: [1],
    //   img: commonImg,
    //   price: "5.50",
    //   description:
    //     "Naruto Uzumaki, un joven ninja marginado, lucha por ganarse el respeto de su aldea y cumplir su sueño de ser Hokage.",
    //   condition: "Buen estado",
    // },
    // {
    //   title: "Demon Slayer",
    //   volumes: [1, 2],
    //   img: commonImg,
    //   price: "6.50",
    //   description:
    //     "Tras la masacre de su familia, Tanjiro Kamado se convierte en cazador de demonios para curar a su hermana y vengar a los suyos.",
    //   condition: "Nuevo",
    // },
  ];

  // Paginación (igual que antes)
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(wishlist.length / ITEMS_PER_PAGE);
  const [page, setPage] = useState(1);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentList = wishlist.slice(start, start + ITEMS_PER_PAGE);

  if (wishlist.length === 0) {
    return (
      <DefaultLayout>
        <section className="flex flex-col items-center justify-center px-4">
          <h1 className={`${title()} text-center mb-6`}>Tu lista de deseos</h1>
          <p className="text-default-500 text-center mb-6">
            Aún no has añadido ningún manga a tu wishlist.
          </p>
          <Button color="primary" onPress={() => navigate("/mangas")}>
            Ver mangas disponibles
          </Button>
        </section>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center py-8 gap-12">
        <h1 className={`${title()} text-center`}>Tu lista de deseos</h1>

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
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
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

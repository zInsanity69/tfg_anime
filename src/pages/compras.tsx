// src/pages/purchases.tsx
import { useNavigate } from "react-router-dom";
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

interface Purchase {
  id: number;
  title: string;
  img: string;
  price: number;
  quantity: number;
  date: string; // ISO o formato legible
}

export default function PurchasesPage() {
  const navigate = useNavigate();

  // Datos de ejemplo de compras realizadas
  const purchases: Purchase[] = [
    {
      id: 1,
      title: "One Piece Vol. 1",
      img: "https://cdn.agapea.com/NORMA-EDITORIAL-S-A-/FIRE-FORCE-25-i7n22513263.jpg",
      price: 6.99,
      quantity: 2,
      date: "2025-05-10",
    },
    {
      id: 2,
      title: "Naruto Vol. 1",
      img: "https://cdn.agapea.com/NORMA-EDITORIAL-S-A-/FIRE-FORCE-25-i7n22513263.jpg",
      price: 5.5,
      quantity: 1,
      date: "2025-05-11",
    },
    // … más compras si lo deseas
  ];

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("es-ES", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center py-8 gap-8">
        <h1 className={`${title()} text-center`}>Mis Compras</h1>

        <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4">
          {purchases.map((p) => (
            <Card
              key={p.id}
              isPressable
              shadow="sm"
              className="rounded-2xl overflow-hidden flex flex-col"
            >
              <CardBody className="flex flex-col items-center gap-4 p-4">
                <div className="h-48 overflow-hidden rounded-t-lg">
                  <Image
                    alt={p.title}
                    src={p.img}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <h2 className="font-semibold text-lg text-center">{p.title}</h2>
                <p className="text-sm text-default-500 text-center">
                  Comprado el {formatDate(p.date)}
                </p>
              </CardBody>

              <Divider />

              <CardFooter className="mt-auto flex flex-col gap-2 p-4">
                <div className="flex justify-between w-full">
                  <span className="text-default-500">Cantidad:</span>
                  <span>{p.quantity}</span>
                </div>
                <div className="flex justify-between w-full">
                  <span className="font-medium">Subtotal:</span>
                  <span>{(p.price * p.quantity).toFixed(2)}€</span>
                </div>
                <Button
                  variant="flat"
                  color="primary"
                  size="sm"
                  isDisabled
                  onPress={() => navigate(`/purchase/${p.id}`)}
                >
                  Ver detalles
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}

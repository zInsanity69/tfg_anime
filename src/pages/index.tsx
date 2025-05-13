import { useNavigate } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import { title, subtitle } from "@/components/primitives";
import {
  Input,
  Button,
  Card,
  CardBody,
  CardFooter,
  Image,
} from "@heroui/react";
import { button as buttonStyles } from "@heroui/theme";
import { SearchIcon } from "@/components/icons";

export default function HomePage() {
  const navigate = useNavigate();
  const commonImg =
    "https://cdn.agapea.com/NORMA-EDITORIAL-S-A-/FIRE-FORCE-25-i7n22513263.jpg";

  const destacados = [
    { id: 1, title: "One Piece Vol. 1", price: "6.99€" },
    { id: 2, title: "Naruto Vol. 1", price: "5.50€" },
    { id: 3, title: "Demon Slayer Vol. 1", price: "6.50€" },
    { id: 4, title: "Attack on Titan Vol. 1", price: "7.20€" },
  ];

  const searchInput = (
    <Input
      aria-label="Buscar"
      classNames={{
        inputWrapper: "bg-default-100",
        input: "text-sm",
      }}
      labelPlacement="outside"
      placeholder="Buscar manga..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <DefaultLayout>
      {/* Hero con búsqueda */}
      <section className="relative h-[35rem] flex items-center justify-center text-white overflow-hidden rounded-3xl">
        {/* Vídeo de fondo */}
        <video
          className="absolute inset-0 w-full h-full object-cover"
          src="/hero.mp4"
          autoPlay
          muted
          loop
        />

        {/* Capa oscura */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Contenido sobre el vídeo */}
        <div className="relative z-10 text-center px-4">
          <h1 className={`${title()} text-4xl md:text-6xl mb-4`}>
            MarmiMangas
          </h1>
          <p className={`${subtitle()} mb-8`}>
            Compra, vende o intercambia tus mangas favoritos de segunda mano.
          </p>
          <div className="m-4">{searchInput}</div>
          <Button
            color="primary"
            onPress={() => navigate("/mangas")}
            className="mt-6 px-8 py-4 shadow-lg"
          >
            Explorar catálogo
          </Button>
        </div>
      </section>

      {/* Sección de categorías */}
      <section className="container mx-auto px-6 py-12">
        <h2 className={`${title()} text-2xl text-center mb-8`}>
          Explora por género
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {[
            { label: "Shōnen", icon: "少年" },
            { label: "Seinen", icon: "青年" },
            { label: "Shōjo", icon: "少女" },
          ].map((cat) => (
            <Card
              key={cat.label}
              isPressable
              shadow="sm"
              className="flex flex-col items-center p-6 text-center hover:bg-default-100 transition"
              onPress={() => navigate(`/mangas?genre=${cat.label}`)}
            >
              <div className="text-4xl mb-4">{cat.icon}</div>
              <h3 className="font-semibold text-lg">{cat.label}</h3>
            </Card>
          ))}
        </div>
      </section>

      {/* Destacados */}
      <section className="py-12">
        <div className="container mx-auto px-6">
          <h2 className={`${title()} text-2xl text-center mb-8`}>
            Destacados de la semana
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destacados.map((m) => (
              <Card
                key={m.id}
                isPressable
                shadow="md"
                className="flex flex-col h-80"
                onPress={() => navigate(`/manga/${m.id}`)}
              >
                <CardBody className="p-0 flex-shrink-0">
                  <div className="h-44 overflow-hidden rounded-t-lg">
                    <Image
                      alt={m.title}
                      src={commonImg}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4 flex-1">
                    <h3 className="font-semibold">{m.title}</h3>
                  </div>
                </CardBody>
                <CardFooter className="flex justify-between items-center p-4 pt-0">
                  <span className="text-default-500">{m.price}</span>
                  <Button
                    size="sm"
                    variant="bordered"
                    onPress={() => navigate(`/manga/${m.id}`)}
                  >
                    Ver detalle
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Llamada a vender */}
      <section className="flex flex-col items-center text-center py-16 px-6">
        <h2 className={`${title()} text-3xl mb-4`}>
          ¿Tienes mangas que ya no lees?
        </h2>
        <p className="text-default-600 max-w-xl mb-6">
          Únete a nuestra comunidad y pon a la venta esos volúmenes que ya no
          necesitas. ¡Es gratis y muy fácil!
        </p>
        <Button
          onPress={() => navigate("/plublicarManga")}
          className={buttonStyles({
            color: "primary",
            radius: "full",
            variant: "shadow",
          })}
        >
          Vender mi manga
        </Button>
      </section>
    </DefaultLayout>
  );
}

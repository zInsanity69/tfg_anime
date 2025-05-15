// src/pages/mangas.tsx
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import {
  Card,
  CardBody,
  CardFooter,
  Image,
  Pagination,
  Input,
  Select,
  SelectItem,
  Slider,
} from "@heroui/react";

export default function MangaPage() {
  const navigate = useNavigate();
  const { search: qs } = useLocation();
  const params = new URLSearchParams(qs);
  const genreParam = params.get("genre") || "Todos";

  const commonImg =
    "https://cdn.agapea.com/NORMA-EDITORIAL-S-A-/FIRE-FORCE-25-i7n22513263.jpg";

  // Lista de mangas con géneros, precio y estado
  const list = [
    {
      title: "One Piece",
      genres: ["Acción", "Aventura"],
      img: commonImg,
      price: 6.99,
      description:
        "Monkey D. Luffy se embarca en una épica aventura pirata en busca del One Piece.",
      condition: "Muy buen estado",
    },
    {
      title: "Naruto",
      genres: ["Acción", "Shōnen"],
      img: commonImg,
      price: 5.5,
      description:
        "Naruto Uzumaki lucha por el reconocimiento de su aldea y sueña con ser Hokage.",
      condition: "Buen estado",
    },
    {
      title: "Attack on Titan",
      genres: ["Drama", "Fantasía"],
      img: commonImg,
      price: 7.2,
      description:
        "La humanidad vive tras muros gigantes para escapar de los titanes devoradores.",
      condition: "Aceptable",
    },
    {
      title: "Death Note",
      genres: ["Suspense", "Thriller"],
      img: commonImg,
      price: 4.8,
      description:
        "Light Yagami usa una libreta mortal para imponer justicia a su manera.",
      condition: "Como nuevo",
    },
    {
      title: "Demon Slayer",
      genres: ["Acción", "Sobrenatural"],
      img: commonImg,
      price: 6.5,
      description:
        "Tanjiro se convierte en cazador de demonios tras la masacre familiar.",
      condition: "Nuevo",
    },
    {
      title: "My Hero Academia",
      genres: ["Superhéroes", "Acción"],
      img: commonImg,
      price: 5.99,
      description: "Izuku Midoriya sueña con ser héroe en un mundo de Quirks.",
      condition: "Muy buen estado",
    },
    {
      title: "Jujutsu Kaisen",
      genres: ["Acción", "Sobrenatural", "Seinen"],
      img: commonImg,
      price: 7.0,
      description:
        "Yuji Itadori combate maldiciones tras ingerir un dedo maldito.",
      condition: "Buen estado",
    },
    {
      title: "Bleach",
      genres: ["Acción", "Aventura", "Shōjo"],
      img: commonImg,
      price: 6.3,
      description:
        "Ichigo protege espíritus y humanos con poderes de shinigami.",
      condition: "Aceptable",
    },
  ];

  // Opciones para filtros
  const stateOptions = [
    "Todos",
    "Muy buen estado",
    "Buen estado",
    "Aceptable",
    "Como nuevo",
    "Nuevo",
  ];
  const genresOptions = [
    "Todos",
    ...Array.from(new Set(list.flatMap((m) => m.genres))),
  ];

  // Estados de UI
  const [search, setSearch] = useState("");
  const [selectedStates, setSelectedStates] = useState<Set<string>>(
    new Set(["Todos"]),
  );
  const [selectedGenres, setSelectedGenres] = useState<Set<string>>(
    new Set([genreParam]),
  );
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [page, setPage] = useState(1);

  // Si cambia el param ?genre= en la URL, sincronizar
  useEffect(() => {
    setSelectedGenres(new Set([genreParam]));
    setPage(1);
  }, [genreParam]);

  // Funciones para manejo de selección múltiple con "Todos"
  const handleStateChange = (keys: React.Key[]) => {
    const next = new Set(keys as string[]);
    if (next.has("Todos") && next.size > 1) {
      next.delete("Todos");
    }
    if (next.size === 0) {
      next.add("Todos");
    }
    setSelectedStates(next);
    setPage(1);
  };

  const handleGenreChange = (keys: React.Key[]) => {
    const next = new Set(keys as string[]);
    if (next.has("Todos") && next.size > 1) {
      next.delete("Todos");
    }
    if (next.size === 0) {
      next.add("Todos");
    }
    // actualizar URL para compartir enlace
    const singleGenre = next.has("Todos") ? null : Array.from(next)[0];
    navigate(
      singleGenre
        ? `/mangas?genre=${encodeURIComponent(singleGenre)}`
        : `/mangas`,
      {
        replace: true,
      },
    );
    setSelectedGenres(next);
    setPage(1);
  };

  // Filtrado previo a paginar
  const filtered = list.filter((m) => {
    if (search && !m.title.toLowerCase().includes(search.toLowerCase()))
      return false;
    if (!selectedStates.has("Todos") && !selectedStates.has(m.condition))
      return false;
    if (
      !selectedGenres.has("Todos") &&
      !m.genres.some((g) => selectedGenres.has(g))
    )
      return false;
    if (m.price < priceRange[0] || m.price > priceRange[1]) return false;
    return true;
  });

  // Paginación
  const ITEMS_PER_PAGE = 12;
  const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
  const start = (page - 1) * ITEMS_PER_PAGE;
  const currentList = filtered.slice(start, start + ITEMS_PER_PAGE);

  const truncateText = (text: string, max: number) =>
    text.length > max ? text.substring(0, max) + "…" : text;

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center py-8 gap-8">
        <h1 className={`${title()} text-center`}>Mangas</h1>

        {/* PANEL DE FILTROS */}
        <div className="flex flex-col sm:flex-row gap-4 w-full max-w-4xl px-4">
          {/* Búsqueda */}
          <Input
            placeholder="Buscar por título..."
            value={search}
            onValueChange={(v) => {
              setSearch(v);
              setPage(1);
            }}
            variant="bordered"
            className="flex-1"
          />

          {/* Filtro: Estado (múltiple) */}
          <Select
            placeholder="Filtrar estado"
            selectionMode="multiple"
            selectedKeys={selectedStates}
            onSelectionChange={handleStateChange}
            variant="bordered"
            className="w-48"
          >
            {stateOptions.map((s) => (
              <SelectItem key={s} value={s}>
                {s}
              </SelectItem>
            ))}
          </Select>

          {/* Filtro: Género (múltiple) */}
          <Select
            placeholder="Filtrar género"
            selectionMode="multiple"
            selectedKeys={selectedGenres}
            onSelectionChange={handleGenreChange}
            variant="bordered"
            className="w-48"
          >
            {genresOptions.map((g) => (
              <SelectItem key={g} value={g}>
                {g}
              </SelectItem>
            ))}
          </Select>
        </div>

        {/* SLIDER DE PRECIO */}
        <div className="w-full max-w-md px-4">
          <Slider
            value={priceRange}
            minValue={0}
            maxValue={1000}
            step={1}
            formatOptions={{ style: "currency", currency: "EUR" }}
            label="Rango de precio"
            showTooltip
            onChange={(v) => {
              setPriceRange(v as [number, number]);
              setPage(1);
            }}
          />
        </div>

        {/* GRID DE CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-4 w-full max-w-6xl">
          {currentList.map((item, idx) => {
            const id = start + idx + 1;
            return (
              <Card
                key={id}
                isPressable
                shadow="sm"
                className="group flex flex-col h-96"
                onPress={() => navigate(`/manga/${id}`)}
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
                      {truncateText(item.description, 100)}
                    </p>
                  </div>
                </CardBody>
                <CardFooter className="mt-auto flex flex-col gap-2 p-4 pt-0">
                  <div className="flex justify-between items-center w-full">
                    <b>{item.title}</b>
                    <span className="text-default-500">{item.price}€</span>
                  </div>
                  <div className="flex justify-between text-xs text-default-400 w-full">
                    <span>Estado: {item.condition}</span>
                    <span>Géneros: {item.genres.join(", ")}</span>
                  </div>
                </CardFooter>
              </Card>
            );
          })}
        </div>

        {/* PAGINACIÓN */}
        <Pagination
          showControls
          currentPage={page}
          total={totalPages}
          onChange={(p) => setPage(p)}
        />
      </section>
    </DefaultLayout>
  );
}

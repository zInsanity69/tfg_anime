// src/pages/MangaDetail.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DefaultLayout from "@/layouts/default";
import {
  Image,
  Button,
  Pagination,
  ScrollShadow,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@heroui/react";
import { title } from "@/components/primitives";
import { HeartIcon } from "@/components/icons";

const ANILIST_QUERY = `
  query ($search: String) {
    Page(page: 1, perPage: 1) {
      media(search: $search, type: MANGA) {
        title {
          romaji
          english
        }
        staff {
          edges {
            role
            node {
              name {
                full
              }
            }
          }
        }
        genres
        studios {
          edges {
            node {
              name
            }
            isMain
          }
        }
      }
    }
  }
`;

export default function MangaDetail() {
  const { id } = useParams<{ id: string }>();
  const [manga, setManga] = useState<any>(null);
  const [imagenes, setImagenes] = useState<string[]>([]);
  const [imgPage, setImgPage] = useState(1);
  const [liked, setLiked] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [author, setAuthor] = useState<string | null>(null);
  const [genres, setGenres] = useState<string[]>([]);
  const [editorial, setEditorial] = useState<string | null>(null);
  const [aniTitle, setAniTitle] = useState<{
    romaji: string;
    english: string | null;
  } | null>(null);

  useEffect(() => {
    // 1) Fetch nuestro manga de la API local
    const fetchLocal = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/mangas/${id}`);
        if (!res.ok) throw new Error("Manga no encontrado");
        const data = await res.json();
        setManga(data);
      } catch (err) {
        console.error("Error al obtener manga local:", err);
      }
    };

    // 2) Fetch imágenes
    const fetchImagenes = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/imagenes/${id}`);
        if (!res.ok) throw new Error("Imágenes no encontradas");
        const data = await res.json();
        setImagenes(data.map((img: any) => img.url_img));
      } catch (err) {
        console.error("Error al obtener imágenes:", err);
      }
    };

    fetchLocal();
    fetchImagenes();
  }, [id]);

  useEffect(() => {
    // Cuando tengamos el nombre local, buscamos en AniList
    if (!manga?.nombre) return;

    const fetchAniList = async () => {
      try {
        const res = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: ANILIST_QUERY,
            variables: { search: "Naruto" },
          }),
        });
        const json = await res.json();
        const media = json.data?.Page?.media?.[0];
        if (!media) return;

        // Título de AniList
        setAniTitle({
          romaji: media.title.romaji,
          english: media.title.english,
        });

        // Autor
        const authorEdge = media.staff.edges.find(
          (e: any) => e.role === "AUTHOR",
        );
        setAuthor(authorEdge?.node?.name?.full || null);

        // Géneros
        setGenres(media.genres || []);

        // Editorial (studio principal)
        const mainStudio = media.studios.edges.find((e: any) => e.isMain);
        setEditorial(mainStudio?.node?.name || null);
      } catch (err) {
        console.error("Error al consultar AniList:", err);
      }
    };

    fetchAniList();
  }, [manga]);

  if (!manga) {
    return (
      <DefaultLayout>
        <p className="text-center p-4">Cargando...</p>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout hideFooter>
      <section className="flex justify-center py-8 px-4 md:py-12 md:px-6">
        <div className="w-full max-w-5xl bg-default-100 shadow-xl rounded-3xl p-4 md:p-8">
          <div className="flex flex-col md:flex-row">
            {/* Galería de imágenes */}
            <div className="relative w-full md:w-1/2 flex justify-center items-center overflow-hidden">
              <div className="w-[40rem] md:h-[40rem] rounded-xl">
                <Image
                  removeWrapper
                  alt={manga.nombre}
                  className="z-0 w-full h-full object-cover"
                  src={
                    `http://localhost:3001${imagenes[imgPage - 1]}` ||
                    "/placeholder.jpg"
                  }
                />
              </div>
              <Button
                isIconOnly
                radius="full"
                variant="light"
                className="absolute top-4 right-4 bg-default"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  size={28}
                  className={liked ? "text-red-500" : "text-white"}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <Pagination
                  showControls
                  page={imgPage}
                  total={imagenes.length || 1}
                  onChange={setImgPage}
                  size="sm"
                />
              </div>
            </div>

            {/* Detalles del manga */}
            <div className="flex-1 p-4 md:p-8 text-white flex flex-col">
              <div className="flex items-end mb-6 justify-between">
                <div>
                  <h1 className={`${title()} text-2xl sm:text-3xl`}>
                    {manga.nombre}
                  </h1>
                  {aniTitle && (
                    <p className="text-sm text-default-500">
                      ({aniTitle.english || aniTitle.romaji})
                    </p>
                  )}
                </div>
                <span className="text-2xl sm:text-3xl">{manga.precio}€</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6 sm:mb-8">
                <div className="space-y-3">
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      Autor
                    </h2>
                    <p className="text-sm sm:text-base">{author || "—"}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      Géneros
                    </h2>
                    <p className="text-sm sm:text-base">
                      {genres.length > 0 ? genres.join(", ") : "—"}
                    </p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      Editorial
                    </h2>
                    <p className="text-sm sm:text-base">{editorial || "—"}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      Estado
                    </h2>
                    <p className="text-sm sm:text-base">{manga.estado_manga}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      Volúmenes
                    </h2>
                    <p className="text-sm sm:text-base">{manga.volumenes}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      Cantidad
                    </h2>
                    <p className="text-sm sm:text-base">{manga.cantidad}</p>
                  </div>
                </div>
              </div>

              <div>
                <h2 className="font-semibold text-lg mb-2">Sinopsis</h2>
                <ScrollShadow className="max-h-40 overflow-y-auto pr-2">
                  <p className="text-base">{manga.informacion_vendedor}</p>
                </ScrollShadow>
              </div>

              <Modal isOpen={isOpen} size="md" onClose={onClose}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader>Descripción del vendedor</ModalHeader>
                      <ModalBody>
                        <p>{manga.informacion_vendedor}</p>
                      </ModalBody>
                      <ModalFooter>
                        <Button
                          color="danger"
                          variant="light"
                          onPress={onClose}
                        >
                          Cerrar
                        </Button>
                      </ModalFooter>
                    </>
                  )}
                </ModalContent>
              </Modal>

              <Button className="mt-4" variant="solid" onPress={onOpen}>
                Ver descripción completa
              </Button>

              <div className="mt-4 flex flex-col sm:flex-row gap-4 sm:gap-6">
                <Button
                  className="flex-1 py-3 text-base sm:text-lg"
                  color="primary"
                >
                  Comprar
                </Button>
                <Button
                  className="flex-1 py-3 text-base sm:text-lg"
                  variant="bordered"
                  isDisabled
                >
                  Contactar
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}

import { useState } from "react";
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
import { useParams } from "react-router-dom";

export default function MangaDetail() {
  const images = [
    "https://cdn.agapea.com/NORMA-EDITORIAL-S-A-/FIRE-FORCE-25-i7n22513263.jpg",
    "https://www.normaeditorial.com/upload/media/albumes/0001/06/59e6cfc748ef23abe8a147484af6f3842385cc54.jpeg",
    "https://preview.redd.it/a8lbqmv7xji81.jpg?width=640&crop=smart&auto=webp&s=99ea5e5ba3e108c05166887092387ca5bdc257a6",
  ];
  const { id } = useParams<{ id: string }>();
  const [imgPage, setImgPage] = useState(1);
  const [liked, setLiked] = useState(false);
  const price = "6.99";

  // Modal disclosure hook
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <DefaultLayout hideFooter>
      <section className="flex justify-center py-8 px-4 md:py-12 md:px-6">
        <div className="w-full max-w-5xl bg-default-100 shadow-xl rounded-3xl p-4 md:p-8">
          <div className="flex flex-col md:flex-row">
            {/* Galería de imágenes + overlays */}
            <div className="relative w-full md:w-1/2 flex justify-center items-center overflow-hidden">
              {/* Contenedor de tamaño fijo */}
              <div className=" w-[40rem] md:h-[40rem] rounded-xl">
                <Image
                  removeWrapper
                  alt="Card background"
                  className="z-0 w-full h-full object-cover"
                  src={images[imgPage - 1]}
                />
              </div>
              {/* HeartIcon encima de la imagen */}
              <Button
                isIconOnly
                radius="full"
                variant="light"
                className="absolute top-4 right-4 bg-default data-[pressed]:scale-95 transition-transform"
                onPress={() => setLiked((v) => !v)}
              >
                <HeartIcon
                  size={28}
                  className={liked ? "text-red-500" : "text-white"}
                  fill={liked ? "currentColor" : "none"}
                />
              </Button>
              {/* Paginación superpuesta */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <Pagination
                  showControls
                  page={imgPage}
                  total={images.length}
                  onChange={(p) => setImgPage(p)}
                  size="sm"
                  className="rounded-full px-2 py-1 data-[pressed]:scale-95 transition-transform"
                />
              </div>
            </div>

            {/* Información */}
            <div className="flex-1 p-4 md:p-8 flex flex-col text-white">
              {/* Título + Precio */}
              <div className="flex items-end mb-6 justify-between">
                <h1 className={`${title()} text-2xl sm:text-3xl`}>
                  Fire Force
                </h1>
                <span className="text-2xl sm:text-3xl">{price}€</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-6 mb-6 sm:mb-8">
                {/* Columna izquierda */}
                <div className="space-y-3">
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      Autor
                    </h2>
                    <p className="text-sm sm:text-base">Atsushi Ōkubo</p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      Editorial
                    </h2>
                    <p className="text-sm sm:text-base">Norma Editorial</p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      Géneros
                    </h2>
                    <p className="text-sm sm:text-base">Acción, Aventura</p>
                  </div>
                </div>
                {/* Columna derecha */}
                <div className="space-y-3">
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      Estado
                    </h2>
                    <p className="text-sm sm:text-base">En curso</p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      Volúmenes
                    </h2>
                    <p className="text-sm sm:text-base">1 — 25</p>
                  </div>
                  <div>
                    <h2 className="font-semibold text-base sm:text-lg">
                      Condición
                    </h2>
                    <p className="text-sm sm:text-base">Muy buen estado</p>
                  </div>
                </div>
              </div>

              {/* Sinopsis con ScrollShadow */}
              <div className="">
                <h2 className="font-semibold text-lg mb-2">Sinopsis</h2>
                <ScrollShadow className="max-h-40 overflow-y-auto pr-2">
                  <p className="text-base">
                    Shinra Kusakabe es un joven con la habilidad de encender sus
                    pies al estilo de un demonio. Alista en la Brigada de monio.
                    Alista en la Brigada de monio. Alista en la Brigada de
                    monio. Alist la Brigada de monio. Alista en la Brigada de
                    monio. Alista en
                  </p>
                </ScrollShadow>
              </div>

              {/* Modal debajo de la sinopsis */}
              <Modal isOpen={isOpen} size="md" onClose={onClose}>
                <ModalContent>
                  {(onClose) => (
                    <>
                      <ModalHeader>Descripcion del vendedor</ModalHeader>
                      <ModalBody>
                        <p>
                          Fire Force es una serie de manga escrita e ilustrada
                          por Atsushi Ōkubo. Publicada desde 2015 en la revista
                          Weekly Shōnen Magazine, sigue las aventuras de Shinra
                          Kusakabe y la Brigada de la Misión Especial.
                        </p>
                        <p className="mt-2">
                          La serie se caracteriza por su combinación de acción
                          sobrenatural, humor y misterio, con escenas de combate
                          encendidas por las llamas demoníacas de Shinra.
                        </p>
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

              {/* Botón para abrir el modal */}
              <Button className="mt-4" variant="solid" onPress={onOpen}>
                Descripcion vendedor
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

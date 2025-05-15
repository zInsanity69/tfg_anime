// src/pages/docs.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Form,
  Input,
  Textarea,
  Button,
  Select,
  SelectItem,
} from "@heroui/react";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { useAuth } from "@/context/AuthContext";

// GraphQL query para buscar manga por título
const SEARCH_MANGA = `
  query ($search: String) {
    Page(page: 1, perPage: 5) {
      media(search: $search, type: MANGA) {
        id
        title {
          romaji
          english
        }
      }
    }
  }
`;

export default function PublicManga() {
  const { idUsuario } = useAuth();
  const [files, setFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    nombre: "",
    estado_manga: "",
    volumenes: "",
    cantidad: "",
    precio: "",
    informacion_vendedor: "",
  });

  // Sugerencias de título de manga
  const [suggestions, setSuggestions] = useState<string[]>([]);
  // Para controlar el debounce (inicializado a undefined)
  const debounceRef = useRef<number | undefined>(undefined);

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Focus inicial en el file input
  useEffect(() => {
    fileInputRef.current?.focus();
  }, []);

  // Efecto para buscar sugerencias
  useEffect(() => {
    // Si el campo está vacío, limpiamos sugerencias
    if (!formData.nombre) {
      setSuggestions([]);
      return;
    }

    // Debounce: esperamos 500ms desde la última pulsación
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(async () => {
      try {
        console.log("[autocomplete] Buscando:", formData.nombre);
        const res = await fetch("https://graphql.anilist.co", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            query: SEARCH_MANGA,
            variables: { search: formData.nombre },
          }),
        });
        const { data } = await res.json();
        // Extraemos los títulos (prefiriendo inglés si existe)
        const titles = data.Page.media.map(
          (m: any) => m.title.english || m.title.romaji,
        );
        console.log("[autocomplete] Sugerencias recibidas:", titles);
        setSuggestions(titles);
      } catch (e) {
        console.error("Error fetching suggestions", e);
      }
    }, 500);

    // Limpieza del timeout si cambia el nombre antes de los 500ms
    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [formData.nombre]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log("Form data:", formData);
    console.log("Files:", files);
    console.log("ID Usuario:", idUsuario);

    try {
      const mangaResponse = await fetch("http://localhost:3001/api/mangas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          id_usuario: idUsuario,
          precio: parseFloat(formData.precio),
          cantidad: parseInt(formData.cantidad),
        }),
      });

      const manga = await mangaResponse.json();
      const id_manga = manga.id;

      for (const file of files) {
        const form = new FormData();
        form.append("img", file);
        form.append("id_manga", String(id_manga));

        await fetch("http://localhost:3001/api/imagenes", {
          method: "POST",
          body: form,
        });
      }

      alert("¡Publicado correctamente!");
      setFormData({
        nombre: "",
        estado_manga: "",
        volumenes: "",
        cantidad: "",
        precio: "",
        informacion_vendedor: "",
      });
      setFiles([]);
    } catch (error) {
      console.error("Error al publicar manga:", error);
      alert("❌ Error al publicar");
    }
  };

  const states = ["Malo", "Aceptable", "Buen estado", "Como nuevo", "Nuevo"];

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center py-12 px-4">
        <h1 className={`${title()} mb-8 text-center`}>
          Publicar un nuevo manga
        </h1>

        <div className="w-full max-w-5xl bg-default-100 rounded-2xl p-6 md:w-1/2">
          <Form
            onSubmit={onSubmit}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            <div className="flex flex-col gap-4">
              {/* Input con lista de sugerencias */}
              <Input
                label="Nombre"
                name="nombre"
                variant="bordered"
                isRequired
                placeholder="Introduce el título"
                value={formData.nombre}
                onValueChange={(val) => handleChange("nombre", val)}
                list="manga-list"
              />
              {/* Datalist que se actualiza dinámicamente */}
              <datalist id="manga-list">
                {suggestions.map((t, i) => (
                  <option key={i} value={t} />
                ))}
              </datalist>

              <Select
                className="max-w-xs"
                variant="bordered"
                isRequired
                label="Estado del manga"
                placeholder="Ej. Nuevo, Malo..."
                selectedKeys={[formData.estado_manga]}
                onSelectionChange={(keys) =>
                  handleChange("estado_manga", Array.from(keys)[0] as string)
                }
              >
                {states.map((valor) => (
                  <SelectItem key={valor}>{valor}</SelectItem>
                ))}
              </Select>
              <Input
                label="Número de volumen"
                name="volumenes"
                variant="bordered"
                isRequired
                placeholder="Ej. 1,2,3"
                value={formData.volumenes}
                onValueChange={(val) => handleChange("volumenes", val)}
              />
              <Input
                label="Cantidad"
                name="cantidad"
                variant="bordered"
                isRequired
                placeholder="Ej. 5"
                value={formData.cantidad}
                onValueChange={(val) => handleChange("cantidad", val)}
              />
              <Input
                label="Precio"
                name="precio"
                variant="bordered"
                isRequired
                placeholder="Ej. 5€"
                value={formData.precio}
                onValueChange={(val) => handleChange("precio", val)}
              />
            </div>

            <div className="flex flex-col gap-4">
              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                type="button"
                color="primary"
                onPress={triggerFileSelect}
                className="w-full"
              >
                Subir imágenes
              </Button>
              <div className="mt-2 bg-default-100 rounded-lg h-40 overflow-auto p-2">
                {files.length === 0 ? (
                  <p className="text-default-500">
                    No hay imágenes seleccionadas.
                  </p>
                ) : (
                  <div className="grid grid-cols-3 gap-2">
                    {files.map((f, i) => (
                      <img
                        key={i}
                        src={URL.createObjectURL(f)}
                        alt={f.name}
                        className="w-full h-20 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
              <Textarea
                label="Información adicional"
                name="info"
                rows={10}
                placeholder="Introduce descripción, sinopsis..."
                variant="bordered"
                className="h-full"
                value={formData.informacion_vendedor}
                onValueChange={(val) =>
                  handleChange("informacion_vendedor", val)
                }
              />
            </div>

            <div className="col-span-1 lg:col-span-3 flex justify-center mt-6">
              <Button color="primary" type="submit" className="px-8">
                Publicar
              </Button>
            </div>
          </Form>
        </div>
      </section>
    </DefaultLayout>
  );
}

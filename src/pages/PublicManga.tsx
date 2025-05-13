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

export default function PublicManga() {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fileInputRef.current?.focus();
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    alert("¡Publicado!");
  };

  const states = ["Malo", "Buen estado", "Aceptable", "Como nuevo", "Nuevo"];

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
            {/* === COLUMNA 1: Inputs === */}
            <div className="flex flex-col gap-4">
              <Input
                label="Nombre"
                name="name"
                variant="bordered"
                isRequired
                placeholder="Introduce el título"
              />
              <Select
                className="max-w-xs"
                variant="bordered"
                isRequired
                label="Estado del manga"
                placeholder="Ej. Nuevo,Malo..."
              >
                {states.map((valor) => (
                  <SelectItem key={valor}>{valor}</SelectItem>
                ))}
              </Select>
              <Input
                label="Número de volumen"
                name="volume"
                variant="bordered"
                isRequired
                placeholder="Ej. 1,2,3"
              />
              <Input
                label="Cantidad"
                name="quantity"
                variant="bordered"
                isRequired
                placeholder="Ej. 5"
              />{" "}
              <Input
                label="Precio"
                name="quantity"
                variant="bordered"
                isRequired
                placeholder="Ej. 5€"
              />
            </div>

            {/* === COLUMNA 2: Galería de imágenes === */}
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
                  <p className=""></p>
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
              {/* === COLUMNA 3: Textarea adicional === */}
              <div className="flex flex-col">
                <Textarea
                  label="Información adicional"
                  name="info"
                  rows={10}
                  placeholder="Introduce descripción, sinopsis..."
                  variant="bordered"
                  className="h-full"
                />
                {/* === BOTÓN PUBLICAR: ocupa las 3 columnas === */}
              </div>
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

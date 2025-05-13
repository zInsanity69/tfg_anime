"use client";

import { useState } from "react";
import { Button, Input, Form } from "@heroui/react";
import { restablecerContrasena } from "@/config/auth";
import DefaultLayout from "@/layouts/default";

export default function RecuperarContrasena() {
  const [email, setEmail] = useState("");
  const [enviado, setEnviado] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    try {
      await restablecerContrasena(email);
      setEnviado(true);
    } catch (err: any) {
      console.error(err.code);
      if (err.code === "auth/user-not-found") {
        setError("No hay ningún usuario registrado con este correo.");
      } else {
        setError("Ha ocurrido un error al enviar el correo.");
      }
    }
  };

  return (
    <DefaultLayout hideFooter>
      <div className="flex flex-col items-center justify-center h-full px-4">
        <div className="max-w-md w-full space-y-6 bg-default-100 p-6 rounded-lg">
          <h1 className="text-xl font-bold text-center">
            Recuperar contraseña
          </h1>

          {enviado ? (
            <p className="text-sm text-green-600 text-center">
              📩 Te hemos enviado un correo con las instrucciones.
            </p>
          ) : (
            <Form onSubmit={handleSubmit} className="flex flex-col">
              <Input
                label="Correo electrónico"
                type="email"
                isRequired
                value={email}
                onValueChange={setEmail}
                placeholder="Introduce tu correo"
                isInvalid={!!error}
                errorMessage={error}
                className="mt-4 mb-4"
              />
              <Button type="submit" color="primary" className="w-full">
                Enviar enlace de recuperación
              </Button>
            </Form>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
}

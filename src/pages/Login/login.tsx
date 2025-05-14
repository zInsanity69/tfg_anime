"use client";

import React, { useState } from "react";
import { Button, Input, Checkbox, Link, Form, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import DefaultLayout from "@/layouts/default";
import { iniciarSesion, loginConGoogle } from "@/config/auth";
import { useNavigate } from "react-router-dom";
import { UsuarioInput } from "../../../backend/src/types";

export default function Login() {
  const [isVisible, setIsVisible] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const toggleVisibility = () => setIsVisible(!isVisible);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    setErrors({});
    try {
      await iniciarSesion(email, password);
      navigate("/");
    } catch (error: any) {
      console.error("Error al iniciar sesión:", error.code);
      if (error.code === "auth/user-not-found") {
        setErrors({ email: "Este correo no está registrado" });
      } else if (error.code === "auth/wrong-password") {
        setErrors({ password: "Contraseña incorrecta" });
      } else {
        setErrors({ email: "Error al iniciar sesión" });
      }
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const cred = await loginConGoogle();
      console.log("Usuario con Google:", cred.user);

      const nuevoUsuario: UsuarioInput = {
        correo: cred.user.email ?? "",
      };
      console.log("hola");
      await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });
      console.log("adios");
      navigate("/");
    } catch (err) {
      console.error("Error con Google:", err);
    }
  };

  return (
    <DefaultLayout hideFooter>
      <div className="flex flex-1 items-center justify-center">
        <div className="w-full max-w-sm flex flex-col gap-4 rounded-large">
          <div className="flex flex-col items-center pb-6">
            <p className="text-xl font-medium">Bienvenido de nuevo</p>
            <p className="text-small text-default-500">
              Inicia sesión para continuar
            </p>
          </div>

          <Form
            className="flex flex-col gap-3"
            validationErrors={errors}
            onSubmit={handleSubmit}
          >
            <Input
              isRequired
              label="Correo electrónico"
              name="email"
              placeholder="Introduce tu correo"
              type="email"
              variant="bordered"
              errorMessage={errors.email}
              isInvalid={!!errors.email}
            />
            <Input
              isRequired
              endContent={
                <button type="button" onClick={toggleVisibility}>
                  <Icon
                    className="pointer-events-none text-2xl text-default-400"
                    icon={
                      isVisible ? "solar:eye-closed-linear" : "solar:eye-bold"
                    }
                  />
                </button>
              }
              label="Contraseña"
              name="password"
              placeholder="Introduce tu contraseña"
              type={isVisible ? "text" : "password"}
              variant="bordered"
              errorMessage={errors.password}
              isInvalid={!!errors.password}
            />
            <div className="flex w-full items-center justify-between px-1 py-2">
              <Checkbox name="remember" size="sm">
                Recuérdame
              </Checkbox>
              <Link className="text-default-500" href="/recuperar" size="sm">
                ¿Olvidaste tu contraseña?
              </Link>
            </div>
            <Button className="w-full" color="primary" type="submit">
              Iniciar sesión
            </Button>
          </Form>

          <div className="flex items-center gap-4 py-2">
            <Divider className="flex-1" />
            <p className="shrink-0 text-tiny text-default-500">O</p>
            <Divider className="flex-1" />
          </div>

          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
            onClick={handleGoogleLogin}
          >
            Continuar con Google
          </Button>

          <p className="text-center text-small">
            ¿Necesitas crear una cuenta?&nbsp;&nbsp;
            <Link href="/registro" size="sm">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}

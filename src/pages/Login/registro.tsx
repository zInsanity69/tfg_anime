"use client";

import React, { useState } from "react";
import { Form, Input, Checkbox, Button, Link, Divider } from "@heroui/react";
import { Icon } from "@iconify/react";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { registrar, loginConGoogle } from "@/config/auth";
import { useNavigate } from "react-router-dom";
import { UsuarioInput } from "../../../backend/src/types";

export default function Registro() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [isVisible1, setIsVisible1] = useState(false);
  const [isVisible2, setIsVisible2] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const navigate = useNavigate();

  const getPasswordError = (value: string) => {
    if (value.length < 4) return "La contraseña debe tener 4 caracteres o más";
    if (!/[A-Z]/.test(value))
      return "La contraseña necesita al menos 1 letra mayúscula";
    if (!/[^a-zA-Z0-9]/.test(value))
      return "La contraseña necesita al menos 1 símbolo";
    return null;
  };

  const handlePassword1Change = (value: string) => {
    setPassword1(value);
    setErrors((prev) => ({
      ...prev,
      password1: getPasswordError(value) || undefined,
      passwordMatch:
        value !== password2 ? "Las contraseñas no coinciden" : undefined,
    }));
  };

  const handlePassword2Change = (value: string) => {
    setPassword2(value);
    setErrors((prev) => ({
      ...prev,
      password2: getPasswordError(value) || undefined,
      passwordMatch:
        value !== password1 ? "Las contraseñas no coinciden" : undefined,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const newErrors: Record<string, string> = {};

    if (errors.password1 || errors.password2 || errors.passwordMatch) return;

    if (data.username === "admin") {
      newErrors.username = "¡Buen intento! Elige otro nombre de usuario.";
    }

    if (data.terms !== "true") {
      newErrors.terms = "Por favor acepta los términos";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
    }

    try {
      const cred = await registrar(
        data.email as string,
        data.password1 as string,
      );
      console.log("Usuario registrado:", cred.user);

      const nuevoUsuario: UsuarioInput = { token: email };

      await fetch("http://localhost:3001/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoUsuario),
      });

      navigate("/");
    } catch (error: any) {
      console.error("Error en Firebase:", error.code);
      if (error.code === "auth/email-already-in-use") {
        setErrors((prev) => ({
          ...prev,
          email: "Este correo ya está registrado",
        }));
      } else if (error.code === "auth/invalid-email") {
        setErrors((prev) => ({ ...prev, email: "Correo no válido" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "Error al registrar" }));
      }
    }
  };

  const onGoogleRegister = async () => {
    try {
      const cred = await loginConGoogle();
      console.log("Usuario con Google:", cred.user);

      const nuevoUsuario: UsuarioInput = {
        token: cred.user.getIdTokenResult ?? "",
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
      <div className="flex h-full w-full items-center justify-center">
        <div className="flex w-full max-w-sm flex-col gap-4 rounded-large">
          <div className="flex flex-col items-center pb-6">
            <h1 className={`${title()} text-2xl mb-4`}>Registrarse</h1>
            <p className="text-sm text-default-500">
              Crea una cuenta para empezar
            </p>
          </div>

          <Form
            className="flex flex-col gap-3"
            validationErrors={errors}
            onSubmit={onSubmit}
          >
            <Input
              isRequired
              name="username"
              label="Nombre de usuario"
              placeholder="Introduce tu usuario"
              size="lg"
              variant="bordered"
              value={username}
              onValueChange={(v) => {
                setUsername(v);
                setErrors((prev) => ({ ...prev, username: undefined }));
              }}
            />

            <Input
              isRequired
              name="email"
              type="email"
              label="Correo electrónico"
              placeholder="Introduce tu e-mail"
              size="lg"
              variant="bordered"
              value={email}
              onValueChange={(v) => {
                setEmail(v);
                setErrors((prev) => ({ ...prev, email: undefined }));
              }}
            />

            <Input
              isRequired
              name="password1"
              type={isVisible1 ? "text" : "password"}
              label="Contraseña"
              placeholder="Introduce tu contraseña"
              size="lg"
              variant="bordered"
              errorMessage={errors.password1 || errors.passwordMatch}
              isInvalid={!!(errors.password1 || errors.passwordMatch)}
              value={password1}
              onValueChange={handlePassword1Change}
              endContent={
                <button type="button" onClick={() => setIsVisible1((v) => !v)}>
                  <Icon
                    icon={
                      isVisible1 ? "solar:eye-closed-linear" : "solar:eye-bold"
                    }
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                </button>
              }
            />

            <Input
              isRequired
              name="password2"
              type={isVisible2 ? "text" : "password"}
              label="Repite la contraseña"
              placeholder="Repite tu contraseña"
              size="lg"
              variant="bordered"
              errorMessage={errors.password2 || errors.passwordMatch}
              isInvalid={!!(errors.password2 || errors.passwordMatch)}
              value={password2}
              onValueChange={handlePassword2Change}
              endContent={
                <button type="button" onClick={() => setIsVisible2((v) => !v)}>
                  <Icon
                    icon={
                      isVisible2 ? "solar:eye-closed-linear" : "solar:eye-bold"
                    }
                    className="text-2xl text-default-400 pointer-events-none"
                  />
                </button>
              }
            />

            <Checkbox isRequired className="py-4" size="sm" name="terms">
              Estoy de acuerdo con las&nbsp;
              <Link className="relative z-[1]" href="#" size="sm">
                Condiciones de uso
              </Link>
              &nbsp;y&nbsp;
              <Link className="relative z-[1]" href="#" size="sm">
                Política de privacidad
              </Link>
            </Checkbox>

            <div className="flex w-full">
              <Button className="w-full" color="primary" type="submit">
                Regístrate
              </Button>
            </div>
          </Form>

          <div className="flex items-center gap-4 py-2">
            <Divider className="flex-1" />
            <p className="text-tiny text-default-500">O</p>
            <Divider className="flex-1" />
          </div>

          <Button
            startContent={<Icon icon="flat-color-icons:google" width={24} />}
            variant="bordered"
            onClick={onGoogleRegister}
          >
            Regístrate con Google
          </Button>

          <p className="text-center text-sm">
            ¿Ya tienes cuenta?&nbsp;&nbsp;
            <Link href="/login" size="sm">
              Inicia sesión
            </Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
}

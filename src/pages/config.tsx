"use client";

import React, { useRef, useState } from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  Form,
  Input,
  Button,
  Avatar,
  Select,
  SelectItem,
  Switch,
} from "@heroui/react";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";
import { EditPencilIcon } from "@/components/icons";
import { useAuth } from "@/context/AuthContext";

export default function Config() {
  const { user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [avatarUrl, setAvatarUrl] = useState(
    user?.photoURL || "https://i.pravatar.cc/150?u=default",
  );

  const [username, setUsername] = useState(user?.displayName || "");
  const [email, setEmail] = useState(user?.email || "");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [telefono, setTelefono] = useState("");
  const [pais, setPais] = useState("");
  const [direccion, setDireccion] = useState("");
  const [codigoPostal, setCodigoPostal] = useState("");

  const handleUploadClick = () => {
    fileInputRef.current!.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const previewUrl = URL.createObjectURL(file);
    setAvatarUrl(previewUrl);

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      const res = await fetch("/api/upload-avatar", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const { url } = await res.json();
      setAvatarUrl(url);
    } catch (err) {
      console.error(err);
    }

    e.target.value = "";
  };

  const handleGuardarCambios = async () => {
    if (!user?.email) return;

    try {
      const userRes = await fetch(
        `http://localhost:3001/api/usuarios/${encodeURIComponent(user.email)}`,
      );
      if (!userRes.ok)
        throw new Error("Usuario no encontrado en base de datos");

      const usuario = await userRes.json();
      const id_usuario = usuario.id;

      const datos = {
        nombre_usuario: username,
        nombre,
        apellido,
        telefono,
        pais,
        direccion,
        codigo_postal: codigoPostal,
        url_avatar: avatarUrl,
      };

      const res = await fetch(
        `http://localhost:3001/api/usuarios/${id_usuario}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(datos),
        },
      );

      if (!res.ok) throw new Error("Error al guardar datos");
      console.log("✅ Datos actualizados");
    } catch (err) {
      console.error("❌ Error al actualizar datos:", err);
    }
  };

  return (
    <DefaultLayout hideFooter>
      <section className="flex justify-center py-4 px-2 md:py-8 md:px-6">
        <div className="w-full max-w-5xl bg-default-100 shadow-xl rounded-3xl p-4 md:p-8">
          <h1 className={`${title()} mb-4 md:mb-6 text-lg md:text-2xl`}>
            Configuración
          </h1>

          <Tabs aria-label="Configuración" className="mb-4 md:mb-8">
            <Tab key="account" title="Cuenta">
              <Card isBlurred shadow="sm" className="p-4 md:p-6">
                <CardBody>
                  <h2 className="font-semibold text-lg mb-4">
                    Datos de la cuenta
                  </h2>

                  <div className="flex flex-col items-center gap-6 md:items-start">
                    <div className="relative w-24 h-24 m-2">
                      <Avatar
                        src={avatarUrl}
                        size="lg"
                        isBordered
                        className="w-24 h-24 rounded-full object-cover"
                      />
                      <Button
                        isIconOnly
                        radius="full"
                        variant="solid"
                        color="primary"
                        size="sm"
                        className="absolute bottom-0 right-0 translate-x-1/2 translate-y-1/2 p-1 data-[pressed]:scale-95 transition-transform"
                        onPress={handleUploadClick}
                      >
                        <EditPencilIcon size={14} className="text-white" />
                      </Button>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleFileChange}
                      />
                    </div>

                    <div className="flex-1 w-full">
                      <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                          label="Nombre de usuario"
                          name="username"
                          placeholder="Introduce tu usuario"
                          variant="bordered"
                          value={username}
                          onValueChange={setUsername}
                          isRequired
                        />
                        <Input
                          label="Email"
                          name="email"
                          type="email"
                          placeholder="tu@correo.com"
                          variant="bordered"
                          value={email}
                          isDisabled
                          isRequired
                        />
                        <Input
                          label="Nombre"
                          name="firstName"
                          placeholder="Tu nombre"
                          variant="bordered"
                          value={nombre}
                          onValueChange={setNombre}
                          isRequired
                        />
                        <Input
                          label="Apellidos"
                          name="lastName"
                          placeholder="Tus apellidos"
                          variant="bordered"
                          value={apellido}
                          onValueChange={setApellido}
                          isRequired
                        />
                        <Input
                          label="Teléfono"
                          name="phone"
                          placeholder="000 000 000"
                          variant="bordered"
                          value={telefono}
                          onValueChange={setTelefono}
                          isRequired
                        />
                        <Select
                          className="w-full"
                          label="Selecciona país"
                          variant="bordered"
                          selectedKeys={pais ? [pais] : []}
                          onSelectionChange={(keys) =>
                            setPais(Array.from(keys)[0] as string)
                          }
                        >
                          <SelectItem key="argentina">Argentina</SelectItem>
                          <SelectItem key="venezuela">Venezuela</SelectItem>
                          <SelectItem key="brazil">Brazil</SelectItem>
                          <SelectItem key="spain">Spain</SelectItem>
                        </Select>
                        <Input
                          label="Dirección"
                          name="address"
                          placeholder="Calle, número..."
                          variant="bordered"
                          value={direccion}
                          onValueChange={setDireccion}
                          isRequired
                        />
                        <Input
                          label="Código postal"
                          name="zip"
                          placeholder="12345"
                          variant="bordered"
                          value={codigoPostal}
                          onValueChange={setCodigoPostal}
                          isRequired
                        />

                        <div className="md:col-span-2 flex justify-end mt-2">
                          <Button
                            color="primary"
                            onClick={handleGuardarCambios}
                          >
                            Guardar cambios
                          </Button>
                        </div>
                      </Form>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Tab>

            <Tab key="security" title="Seguridad">
              <Card isBlurred shadow="sm" className="p-4 md:p-6 space-y-4">
                <CardBody>
                  <h2 className="font-semibold text-base md:text-lg mb-4">
                    Ajustes de seguridad
                  </h2>

                  <div className="space-y-3">
                    {[
                      "Contraseña",
                      "Autenticación 2FA",
                      "Protección restablecer",
                      "Requerir PIN",
                      "Desactivar cuenta",
                      "Eliminar cuenta",
                    ].map((label, index) => {
                      const descs = [
                        "Establece una contraseña segura.",
                        "Añade una capa extra de seguridad.",
                        "Requiere info adicional para reset.",
                        "Pide un PIN al acceder.",
                        "Desactiva tu cuenta y borra datos.",
                        "Borra permanentemente tu cuenta.",
                      ];
                      const controls = [
                        <Button size="sm" variant="bordered">
                          Cambiar
                        </Button>,
                        <Switch defaultSelected />,
                        <Switch />,
                        <Switch defaultSelected />,
                        <Button size="sm" variant="bordered" color="danger">
                          Desactivar
                        </Button>,
                        <Button size="sm" color="danger">
                          Eliminar
                        </Button>,
                      ];
                      return (
                        <div
                          key={label}
                          className="bg-default-100 rounded-lg p-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2"
                        >
                          <div>
                            <p className="font-medium">{label}</p>
                            <p className="text-sm text-default-500">
                              {descs[index]}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            {controls[index]}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardBody>
              </Card>
            </Tab>
          </Tabs>
        </div>
      </section>
    </DefaultLayout>
  );
}

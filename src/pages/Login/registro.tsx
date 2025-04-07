import React from "react";
import { Form, Input, Checkbox, Button, Link } from "@heroui/react";
import DefaultLayout from "@/layouts/default";
import { title } from "@/components/primitives";

export default function Registro() {
  const [password1, setPassword1] = React.useState("");
  const [password2, setPassword2] = React.useState("");
  const [submitted, setSubmitted] = React.useState(null);
  const [errors, setErrors] = React.useState({});

  const getPasswordError = (value) => {
    if (value.length < 4) return "Password must be 4 characters or more";
    if (!/[A-Z]/.test(value)) return "Password needs at least 1 uppercase letter";
    if (!/[^a-zA-Z0-9]/.test(value)) return "Password needs at least 1 symbol";
    return null;
  };

  const handlePassword1Change = (value) => {
    setPassword1(value);
    setErrors((prev) => ({
      ...prev,
      password1: getPasswordError(value) || undefined,
      passwordMatch: value !== password2 ? "Las contraseñas no coinciden" : undefined,
    }));
  };

  const handlePassword2Change = (value) => {
    setPassword2(value);
    setErrors((prev) => ({
      ...prev,
      password2: getPasswordError(value) || undefined,
      passwordMatch: value !== password1 ? "Las contraseñas no coinciden" : undefined,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    const newErrors = {};

    if (errors.password1 || errors.password2 || errors.passwordMatch) {
      return;
    }

    if (data.name === "admin") {
      newErrors.name = "Nice try! Choose a different username";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    if (data.terms !== "true") {
      setErrors({ terms: "Please accept the terms" });
      return;
    }

    setErrors({});
    setSubmitted(data);
  };

  return (
    <DefaultLayout>
      <div className="flex justify-center items-center h-full">
        <div className="max-w-md w-full">
          <div className="flex justify-center">
            <h1 className={`${title()} text-center mb-4`}>Registrarse</h1>
          </div>

          <Form
            className="w-full flex justify-center items-center"
            validationErrors={errors}
            onReset={() => setSubmitted(null)}
            onSubmit={onSubmit}
          >
            <div className="flex flex-col gap-4">
              <Input
                isRequired
                errorMessage={errors.name}
                labelPlacement="outside"
                label="Username"
                name="name"
                size="lg"
              />

              <Input
                size="lg"
                isRequired
                errorMessage={errors.email}
                label="Email"
                labelPlacement="outside"
                name="email"
                type="email"
              />

              <Input
                isRequired
                errorMessage={errors.password1 || errors.passwordMatch}
                isInvalid={!!errors.password1 || !!errors.passwordMatch}
                label="Introduce la contraseña"
                labelPlacement="outside"
                name="password1"
                type="password"
                value={password1}
                onValueChange={handlePassword1Change}
                size="lg"
              />

              <Input
                isRequired
                errorMessage={errors.password2 || errors.passwordMatch}
                isInvalid={!!errors.password2 || !!errors.passwordMatch}
                label="Repite la contraseña"
                labelPlacement="outside"
                name="password2"
                type="password"
                value={password2}
                onValueChange={handlePassword2Change}
                size="lg"
              />

              <Checkbox
                isRequired
                classNames={{
                  label: "text-small",
                }}
                isInvalid={!!errors.terms}
                name="terms"
                validationBehavior="aria"
                value="true"
                onValueChange={() =>
                  setErrors((prev) => ({ ...prev, terms: undefined }))
                }
              >
                Acepto los términos y condiciones
              </Checkbox>

              {errors.terms && (
                <span className="text-danger text-small">{errors.terms}</span>
              )}

              <div className="flex gap-4">
                <Button className="w-full" color="primary" type="submit">
                  Submit
                </Button>
                <Button type="reset" variant="bordered">
                  Reset
                </Button>
              </div>
            </div>

            <Link className="flex justify-center items-center gap-1" color="foreground" href="/login">
              ¿Tienes cuenta? Inicia sesión
            </Link>

            {submitted && (
              <div className="text-small text-default-500 mt-4">
                Submitted data: <pre>{JSON.stringify(submitted, null, 2)}</pre>
              </div>
            )}
          </Form>
        </div>
      </div>
    </DefaultLayout>
  );
}

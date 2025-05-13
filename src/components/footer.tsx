// src/components/Footer.tsx
import { Link } from "@heroui/link";
import { Input, Button } from "@heroui/react";
import { TwitterIcon, DiscordIcon, GithubIcon } from "@/components/icons";
import { siteConfig } from "@/config/site";

export function Footer() {
  return (
    <footer className="bg-default-100 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* Acerca de */}
        <div className="space-y-4">
          <h3 className="text-white text-lg font-semibold">MarmiMangas</h3>
          <p className="text-sm">
            Somos una comunidad de amantes del manga. Compra, vende e
            intercambia tus tomos de segunda mano de forma fácil y segura.
          </p>
        </div>

        {/* Navegación rápida */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Enlaces</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/mangas">Catálogo</Link>
            </li>
            <li>
              <Link href="/ventas">Mis ventas</Link>
            </li>
            <li>
              <Link href="/wishlist">Wishlist</Link>
            </li>
            <li>
              <Link href="/about">Sobre nosotros</Link>
            </li>
          </ul>
        </div>

        {/* Soporte */}
        <div className="space-y-3">
          <h4 className="text-white font-semibold">Ayuda</h4>
          <ul className="space-y-1 text-sm">
            <li>
              <Link href="/faq">Preguntas frecuentes</Link>
            </li>
            <li>
              <Link href="/contact">Contacto</Link>
            </li>
            <li>
              <Link href="/terms">Términos y condiciones</Link>
            </li>
            <li>
              <Link href="/privacy">Política de privacidad</Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div className="space-y-4">
          <h4 className="text-white font-semibold">Suscríbete</h4>
          <p className="text-sm">
            Recibe ofertas, nuevos lanzamientos y noticias directamente en tu
            correo.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              // lógica de suscripción aquí
            }}
            className="flex flex-col sm:flex-row gap-2"
          >
            <Input
              name="email"
              type="email"
              variant="bordered"
              placeholder="Tu email"
              classNames={{
                inputWrapper: "bg-default-100",
                input: "text-white placeholder-default-500",
              }}
            />
            <Button type="submit" color="primary" className="whitespace-nowrap">
              Suscribirse
            </Button>
          </form>

          <div className="flex space-x-4 pt-2">
            <Link isExternal href={siteConfig.links.twitter} title="Twitter">
              <TwitterIcon className="text-default-400 hover:text-white" />
            </Link>
            <Link isExternal href={siteConfig.links.discord} title="Discord">
              <DiscordIcon className="text-default-400 hover:text-white" />
            </Link>
            <Link isExternal href={siteConfig.links.github} title="GitHub">
              <GithubIcon className="text-default-400 hover:text-white" />
            </Link>
          </div>
        </div>
      </div>

      <div className="mt-12 border-t border-default-700 pt-6 text-center text-xs text-default-600">
        © {new Date().getFullYear()} MarmiMangas · Todos los derechos
        reservados · Hecho con ❤️ por Ruben
      </div>
    </footer>
  );
}

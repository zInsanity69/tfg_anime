// Navbar.tsx
import { Link } from "@heroui/link";
import { Input } from "@heroui/input";
import {
  Navbar as HeroUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/react";
import { link as linkStyles } from "@heroui/theme";
import clsx from "clsx";

import { siteConfig } from "@/config/site";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  SearchIcon,
} from "@/components/icons";
import { Logo } from "@/components/icons";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@heroui/react";
import { useAuth } from "@/context/AuthContext";

export const Navbar = () => {
  const { user } = useAuth();

  const username = user?.displayName || user?.email?.split("@")[0] || "Usuario";
  const avatarUrl = user?.photoURL || "https://i.pravatar.cc/150?u=default";

  const searchInput = (
    <Input
      aria-label="Buscar"
      classNames={{ inputWrapper: "bg-default-100", input: "text-sm" }}
      labelPlacement="outside"
      placeholder="Buscar..."
      startContent={
        <SearchIcon className="text-base text-default-400 pointer-events-none flex-shrink-0" />
      }
      type="search"
    />
  );

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">MarmiMangas</p>
          </Link>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems.map((item) => (
            <NavbarItem key={item.href}>
              <Link
                className={clsx(
                  linkStyles({ color: "foreground" }),
                  "data-[active=true]:text-primary data-[active=true]:font-medium",
                )}
                color="foreground"
                href={item.href}
              >
                {item.label}
              </Link>
            </NavbarItem>
          ))}
        </div>
      </NavbarContent>

      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter} title="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord} title="Discord">
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github} title="GitHub">
            <GithubIcon className="text-default-500" />
          </Link>
        </NavbarItem>
        <NavbarItem className="hidden lg:flex">{searchInput}</NavbarItem>

        <NavbarItem className="flex items-center">
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{ isBordered: true, src: avatarUrl }}
                  className="transition-transform"
                  description={`@${username}`}
                  name={username}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Acciones de usuario" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Conectado como</p>
                  <p className="font-bold">@{username}</p>
                </DropdownItem>
                <DropdownItem key="configuración" href="/config">
                  Configuración
                </DropdownItem>
                <DropdownItem key="mis_ventas" href="/ventas">
                  Mis ventas
                </DropdownItem>
                <DropdownItem key="wishlist" href="/wishlist">
                  Wishlist
                </DropdownItem>
                <DropdownItem
                  key="cerrar_sesion"
                  href="/cerrarsesion"
                  color="danger"
                >
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button as={Link} href="/login" variant="ghost" size="md">
              Iniciar sesión
            </Button>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <NavbarItem className="flex items-center m-2">
          {user ? (
            <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <User
                  as="button"
                  avatarProps={{ isBordered: true, src: avatarUrl }}
                  className="transition-transform"
                  description={`@${username}`}
                  name={username}
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Acciones de usuario" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-bold">Conectado como</p>
                  <p className="font-bold">@{username}</p>
                </DropdownItem>
                <DropdownItem key="configuración" href="/config">
                  Configuración
                </DropdownItem>
                <DropdownItem key="mis_ventas" href="/ventas">
                  Mis ventas
                </DropdownItem>
                <DropdownItem key="wishlist" href="/wishlist">
                  Wishlist
                </DropdownItem>
                <DropdownItem
                  key="cerrar_sesion"
                  href="/cerrarsesion"
                  color="danger"
                >
                  Cerrar sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          ) : (
            <Button as={Link} href="/login" variant="ghost" size="md">
              Iniciar sesión
            </Button>
          )}
        </NavbarItem>
        {searchInput}
        <div className="mx-4 mt-2 flex flex-col gap-2">
          {siteConfig.navMenuItems.map((item, index) => (
            <NavbarMenuItem key={`${item}-${index}`}>
              <Link
                color={index === 2 ? "primary" : "foreground"}
                href={item.href}
                size="lg"
              >
                {item.label}
              </Link>
            </NavbarMenuItem>
          ))}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};

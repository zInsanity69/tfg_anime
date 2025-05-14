export interface MangaInput {
  id_usuario: number;
  nombre: string;
  precio: number;
  cantidad: number;
  estado_manga: string;
  volumenes: string;
  informacion_vendedor: string;
  vendido?: boolean;
}

export interface UsuarioInput {
  correo: string;
}

export interface FavoritoInput {
  id_usuario: number;
  id_manga: number;
}

export interface ImagenInput {
  id_manga: number;
  url_img: string;
}

export interface PedidoInput {
  id_usuario: number;
  id_vendedor: number;
  precio: number;
  estado: string;
}

export interface DetallePedidoInput {
  id_pedido: number;
  id_mangas: number;
}

export interface DatosUsuarioInput {
  nombre_usuario: string;
  nombre: string;
  apellido: string;
  telefono: string;
  pais: string;
  direccion: string;
  codigo_postal: string;
  url_avatar: string;
  id_usuario: number;
}

export interface UpdateUsuarioInput {
  nombre_usuario?: string;
  nombre?: string;
  apellido?: string;
  telefono?: string;
  pais?: string;
  direccion?: string;
  codigo_postal?: string;
  url_avatar?: string;
}

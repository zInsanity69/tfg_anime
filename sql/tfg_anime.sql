-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 15-05-2025 a las 00:41:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tfg_anime`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `datos_usuario`
--

CREATE TABLE `datos_usuario` (
  `id` int(11) NOT NULL,
  `nombre_usuario` varchar(300) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `apellido` varchar(200) NOT NULL,
  `telefono` varchar(300) NOT NULL,
  `pais` varchar(100) NOT NULL,
  `direccion` varchar(300) NOT NULL,
  `codigo_postal` varchar(200) NOT NULL,
  `url_avatar` varchar(300) NOT NULL,
  `id_usuario` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `datos_usuario`
--

INSERT INTO `datos_usuario` (`id`, `nombre_usuario`, `nombre`, `apellido`, `telefono`, `pais`, `direccion`, `codigo_postal`, `url_avatar`, `id_usuario`) VALUES
(1, 'ZzInsanity_', 'Rubén', 'Motos', '600123456', 'Spain', 'Calle Ejemplo, 123', '28001', 'https://i.pravatar.cc/150?u=ruben', 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalles_pedidos`
--

CREATE TABLE `detalles_pedidos` (
  `id` int(11) NOT NULL,
  `id_pedido` int(11) NOT NULL,
  `id_mangas` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `favoritos`
--

CREATE TABLE `favoritos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_manga` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `img_mangas`
--

CREATE TABLE `img_mangas` (
  `id` int(11) NOT NULL,
  `id_manga` int(11) NOT NULL,
  `url_img` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mangas`
--

CREATE TABLE `mangas` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(200) NOT NULL,
  `precio` float NOT NULL,
  `cantidad` int(11) NOT NULL,
  `estado_manga` varchar(100) NOT NULL,
  `volumenes` varchar(100) NOT NULL,
  `informacion_vendedor` varchar(600) NOT NULL,
  `vendido` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedidos`
--

CREATE TABLE `pedidos` (
  `id` int(11) NOT NULL,
  `id_usuario` int(11) NOT NULL,
  `id_vendedor` int(11) NOT NULL,
  `precio` int(11) NOT NULL,
  `estado` varchar(100) NOT NULL,
  `fecha` varchar(100) NOT NULL,
  `cantidad` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `correo` varchar(300) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `correo`) VALUES
(1, 'callatelabocaDanta'),
(2, 'rubenmotos2002@gmail.com');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `datos_usuario`
--
ALTER TABLE `datos_usuario`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `detalles_pedidos`
--
ALTER TABLE `detalles_pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_pedido` (`id_pedido`),
  ADD KEY `id_mangas` (`id_mangas`);

--
-- Indices de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_manga` (`id_manga`);

--
-- Indices de la tabla `img_mangas`
--
ALTER TABLE `img_mangas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_manga` (`id_manga`);

--
-- Indices de la tabla `mangas`
--
ALTER TABLE `mangas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`);

--
-- Indices de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario` (`id_usuario`),
  ADD KEY `id_vendedor` (`id_vendedor`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `datos_usuario`
--
ALTER TABLE `datos_usuario`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `detalles_pedidos`
--
ALTER TABLE `detalles_pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `favoritos`
--
ALTER TABLE `favoritos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `img_mangas`
--
ALTER TABLE `img_mangas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `mangas`
--
ALTER TABLE `mangas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `pedidos`
--
ALTER TABLE `pedidos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `datos_usuario`
--
ALTER TABLE `datos_usuario`
  ADD CONSTRAINT `datos_usuario_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `detalles_pedidos`
--
ALTER TABLE `detalles_pedidos`
  ADD CONSTRAINT `detalles_pedidos_ibfk_1` FOREIGN KEY (`id_pedido`) REFERENCES `pedidos` (`id`),
  ADD CONSTRAINT `detalles_pedidos_ibfk_2` FOREIGN KEY (`id_mangas`) REFERENCES `mangas` (`id`);

--
-- Filtros para la tabla `favoritos`
--
ALTER TABLE `favoritos`
  ADD CONSTRAINT `favoritos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `favoritos_ibfk_2` FOREIGN KEY (`id_manga`) REFERENCES `mangas` (`id`);

--
-- Filtros para la tabla `img_mangas`
--
ALTER TABLE `img_mangas`
  ADD CONSTRAINT `img_mangas_ibfk_1` FOREIGN KEY (`id_manga`) REFERENCES `mangas` (`id`);

--
-- Filtros para la tabla `mangas`
--
ALTER TABLE `mangas`
  ADD CONSTRAINT `mangas_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `pedidos`
--
ALTER TABLE `pedidos`
  ADD CONSTRAINT `pedidos_ibfk_1` FOREIGN KEY (`id_usuario`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `pedidos_ibfk_2` FOREIGN KEY (`id_vendedor`) REFERENCES `usuarios` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;

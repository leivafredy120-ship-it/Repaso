-- =====================================================================
-- UNIVERSIDAD MARIANO GALVEZ DE GUATEMALA - FACULTAD DE INGENIERIA
-- Programacion II - REPASO (practica para el Examen Parcial II)

-- =====================================================================

DROP DATABASE IF EXISTS repaso;
CREATE DATABASE repaso CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE repaso;

CREATE TABLE vehiculo (
    ID_VEHICULO INT           NOT NULL AUTO_INCREMENT,
    ESTADO      BOOLEAN       NOT NULL DEFAULT TRUE,
    PLACA       VARCHAR(10)   NOT NULL,
    MARCA       VARCHAR(50)   NOT NULL,
    MODELO      VARCHAR(50)   NULL,
    COLOR       VARCHAR(30)   NULL,
    PRECIO_DIA  DECIMAL(10,2) NULL,
    PRIMARY KEY (ID_VEHICULO)
);

-- Datos de prueba
INSERT INTO vehiculo (ESTADO, PLACA, MARCA, MODELO, COLOR, PRECIO_DIA) VALUES
(TRUE,  'P123ABC', 'Toyota',  'Hilux 2022',   'Blanco', 350.00),
(TRUE,  'P456DEF', 'Nissan',  'Frontier 2021','Gris',   320.00),
(TRUE,  'P789GHI', 'Hyundai', 'Accent 2023',  'Negro',  180.50),
(TRUE,  'P321JKL', 'Kia',     'Sportage 2020','Rojo',   275.00),
(FALSE, 'P654MNO', 'Mazda',   'Demio 2018',   'Azul',   150.00);

SELECT * FROM vehiculo;

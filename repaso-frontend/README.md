# repaso-frontend

Front-end en React + TypeScript (Vite) para el repaso de Vehiculos.

## Estructura
- `src/api/axios.ts` — instancia de axios (usa `VITE_API_URL`)
- `src/types/Vehiculo.ts` — interfaces
- `src/services/vehiculoService.ts` — llamadas GET/POST/PUT a `/vehiculos`
- `src/pages/VehiculosPage.tsx` — pantalla principal (listado + formulario)

## Pasos para correrlo

1. Instalar dependencias:
   ```
   npm install
   ```
2. Verificar el archivo `.env` (ya viene creado):
   ```
   VITE_API_URL=http://localhost:8080
   ```
3. Con el back-end (`repaso`) corriendo en el puerto 8080, iniciar el front-end:
   ```
   npm run dev
   ```
4. Abrir la URL que muestra Vite (normalmente http://localhost:5173).

## Antes de subir a GitHub
- Cambia `NOMBRE_ALUMNO` y `CARNET_ALUMNO` en `src/pages/VehiculosPage.tsx` si necesitas ajustarlos.
- No subas la carpeta `node_modules` (ya está en `.gitignore`).

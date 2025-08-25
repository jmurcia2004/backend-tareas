# 🚀 Despliegue en Render

Este proyecto se encuentra preparado para despliegue automático en [Render](https://render.com).

## Pasos para desplegar

1. Crear un nuevo servicio **Web Service** en Render.
2. Conectar el repositorio de GitHub.
3. Seleccionar:
   - Runtime: Node
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
4. Configurar las variables de entorno en Render:
   - `DATABASE_URL` → conexión a PostgreSQL en Render
   - `JWT_SECRET` → clave secreta para JWT
   - `JWT_EXPIRES_IN` → tiempo de expiración de los tokens
5. Deployar 🚀

El backend quedará accesible en la URL pública que Render genere.

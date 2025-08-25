
---

### 📄 `architecture.md`
```markdown
# 🏗️ Arquitectura del Proyecto

El proyecto sigue la arquitectura modular de **NestJS**.

## Carpetas principales

- `backend/src/auth/` → autenticación con JWT.
- `backend/src/users/` → manejo de usuarios.
- `backend/src/tasks/` → CRUD de tareas.
- `backend/src/types/` → tipados y definiciones adicionales.
- `mobile/` → frontend en Flutter.
- `docs/` → documentación y pruebas (Postman, setup, despliegue).

## Flujo de autenticación

1. El usuario se registra en `/auth/register`.
2. Inicia sesión en `/auth/login`.
3. Obtiene un token JWT.
4. Con el token puede acceder a `/tasks` (crear, listar, actualizar, eliminar).

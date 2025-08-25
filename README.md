# 📱 Aplicación de Gestión de Tareas

Este proyecto es una **aplicación completa de gestión de tareas**, desarrollada como parte de una prueba técnica y pensado como un sistema real que combina **backend con NestJS** y **frontend móvil con Flutter**.  

El objetivo fue crear una aplicación en la que los usuarios puedan **registrarse, iniciar sesión y gestionar sus propias tareas** (crear, listar, editar, eliminar, marcar como completadas). Además, el backend se encuentra desplegado en **Render**, y el frontend se conecta a dicho servicio en la nube.

---

## 🚀 Tecnologías y herramientas utilizadas

### 🔹 Backend
- **Node.js** — Entorno de ejecución para JavaScript/TypeScript.
- **NestJS** — Framework modular y escalable para construir APIs.
- **TypeORM** — ORM para PostgreSQL.
- **PostgreSQL** — Base de datos relacional.
- **JWT** — Autenticación segura con tokens.
- **Render** — Plataforma de despliegue en la nube.

### 🔹 Frontend (Mobile)
- **Flutter** — Framework para apps multiplataforma (Android/iOS/Web).
- **Provider** — Manejo de estado global.
- **http** — Peticiones REST al backend.
- **SharedPreferences** — Almacenamiento local de sesión.

### 🔹 Otras herramientas
- **Postman** — Pruebas de endpoints (registro, login, CRUD de tareas).
- **Git & GitHub** — Control de versiones y repositorio remoto.
- **Android Studio** — Emulación y pruebas del frontend.
- **PowerShell / Terminal** — Flujo de desarrollo y despliegue.

---

## 📂 Estructura del proyecto

```bash
backend-tareas/
├── backend/          # Código fuente del backend NestJS
│   ├── src/
│   │   ├── auth/     # Módulo de autenticación (login, registro, JWT)
│   │   ├── tasks/    # Módulo de tareas (CRUD con permisos por usuario)
│   │   ├── users/    # Módulo de usuarios
│   │   ├── main.ts   # Punto de entrada de la app
│   └── ...
│
├── mobile/           # Aplicación móvil en Flutter
│   ├── lib/
│   │   ├── providers/   # Manejo de estado (TaskProvider)
│   │   ├── services/    # ApiService para consumir el backend
│   │   ├── screens/     # Pantallas: login, registro, listado de tareas
│   │   └── main.dart    # Punto de entrada de la app
│   └── ...
│
├── README.md         # Documentación principal del proyecto
└── ...


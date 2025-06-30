
# 🚀 SYSCOM - Backend API

Sistema SAAS para gestión de ventas, compras, facturación, contabilidad e inventario. Incluye bitácoras de acciones y API, manejo de usuarios, roles, permisos, cotizaciones, control de inventario, configuración de usuarios, registro de empresas y sucursales, y sistema de cobro por uso.

> Este proyecto corresponde **únicamente** al backend de la aplicación, desarrollado como una **API REST** utilizando **Node.js**, **Express.js** y **PostgreSQL**, con documentación Swagger y configuración robusta.

---

## 📑 Tabla de Contenido

- [🔧 Stack Tecnológico](#-stack-tecnológico)
- [📦 Descripción de Comandos (packagejson)](#-descripción-de-comandos-packagejson)
- [📂 Estructura del Proyecto](#-estructura-del-proyecto)
- [📚 Funcionalidades Principales](#-funcionalidades-principales)
- [📝 Documentación Swagger](#-documentación-swagger)
- [⚙️ Configuraciones Importantes](#-configuraciones-importantes)
- [💡 Notas Finales](#-notas-finales)

---

## 🔧 Stack Tecnológico

| Tecnología | Descripción | Badge |
|-------------|-----------------|--------|
| ![Node.js](https://img.shields.io/badge/Node.js-18.x-green) | Entorno de ejecución para JavaScript en el servidor | [Node.js](https://nodejs.org/) |
| ![Express](https://img.shields.io/badge/Express.js-4.x-black) | Framework minimalista para APIs en Node.js | [Express](https://expressjs.com/) |
| ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15.x-blue) | Sistema de gestión de bases de datos relacional | [PostgreSQL](https://www.postgresql.org/) |
| ![Swagger](https://img.shields.io/badge/Swagger-UI-green) | Documentación interactiva de la API | [Swagger](https://swagger.io/tools/swagger-ui/) |

[⬆️ Volver al inicio](#-syscom---backend-api)

---

## 📦 Descripción de Comandos (package.json)

| Comando | Descripción |
|-------------|-----------------|
| `npm start` | Inicia la API en modo producción. |
| `npm run dev` | Inicia la API en modo desarrollo usando **nodemon**. |
| `npm test` | Comando de prueba predeterminado (actualmente sin pruebas configuradas). |

[⬆️ Volver al inicio](#-syscom---backend-api)

---

## 📂 Estructura del Proyecto

```plaintext
SYSCOM/
├── app.js                   # Archivo principal de la aplicación
├── config/                  # Configuración de la API y entorno
├── controllers/             # Lógica de controladores para rutas
├── database/                # Configuración y conexión a la base de datos
│   └── migrations/          # Archivos SQL para estructura de base de datos
├── docs/                    # Documentación Swagger y otros recursos
├── helpers/                 # Funciones de ayuda reutilizables
├── middlewares/             # Middlewares personalizados (validaciones, autenticaciones, etc.)
├── models/                  # Modelos y configuración del servidor (solo server.js)
├── public/                  # Archivos públicos (imágenes, recursos estáticos)
├── route/                   # Definición de rutas de la API
└── package.json             # Configuración de dependencias y scripts
```

[⬆️ Volver al inicio](#-syscom---backend-api)

---

## 📚 Funcionalidades Principales

✅ Gestión de **ventas** y **compras**  
✅ Emisión de **facturas electrónicas**  
✅ **Bitácoras** de acciones contables  
✅ **Bitácoras** de llamadas a la API  
✅ **Bitácoras** de operaciones **Insert**, **Delete**, **Update** en todas las tablas  
✅ Gestión de **usuarios**, **roles** y **permisos**  
✅ Creación de **cotizaciones**  
✅ Manejo de **inventario**  
✅ Configuración personalizada de **usuarios**  
✅ Registro de **empresas** y **sucursales**  
✅ Sistema de **cobro por uso** a los usuarios  
✅ Documentación completa con **Swagger**  

[⬆️ Volver al inicio](#-syscom---backend-api)

---

## 📝 Documentación Swagger

El proyecto incluye documentación Swagger accesible desde:

```
http://localhost:PORT/api/docs
```

> Reemplaza **PORT** por el puerto configurado en tu archivo `.env`.

La documentación Swagger permite explorar y probar los endpoints de la API de forma interactiva.

[⬆️ Volver al inicio](#-syscom---backend-api)

---

## ⚙️ Configuraciones Importantes

Este proyecto requiere configuración por medio de variables de entorno en un archivo `.env`. Ejemplo básico:

```ini
PORT=3000
DB_HOST=localhost
DB_USER=postgres
DB_PASSWORD=tu_password
DB_NAME=syscom
DB_PORT=5432
JWT_SECRET=clave_secreta
```

[⬆️ Volver al inicio](#-syscom---backend-api)

---

## 💡 Notas Finales

- Este proyecto está en constante desarrollo.  
- Recomendado seguir las buenas prácticas de seguridad para el despliegue.  
- Se recomienda ejecutar las migraciones SQL antes de iniciar la aplicación.  
- Licencia: [MIT](https://opensource.org/licenses/MIT)  

[⬆️ Volver al inicio](#-syscom---backend-api)

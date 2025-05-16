# 🚚 Dubra API

API REST de Dubra Transporte y Logística.  
Este backend gestiona pedidos, envíos, estados, autenticación y más.  
Está desarrollado con Node.js + Express usando Clean Architecture, TypeScript y Prisma ORM.

---

## 🧱 Estructura del Proyecto

```
src/
├── app/
│   └── server.ts          # Punto de entrada y configuración principal
└── tests/                 # Carpeta para guardar los archivos de test
|   └── server.test.ts     # Ejemplo
prisma/
└── schema.prisma          # Modelo de datos y migraciones
.env                       # Configuraciones de entorno
tsconfig.json
package.json
package-lock.json
jest.config.ts
README.md
```

---

## 🧱 Arquitectura en capas (resumido)

| Comando           | Descripción                                                  |
| ----------------- | ------------------------------------------------------------ |
| `domain/`         | Reglas de negocio puras (entidades, repositorios, use-cases) |
| `infrastructure/` | Prisma, Express, controladores, rutas, DB                    |
| `application/`    | Casos de uso aplicando lógica                                |
| `shared/`         | Utilidades genéricas (hash, errores, etc.)                   |

---

## 🚀 Instalación Rápida

Clonar el repositorio

```bash
git clone https://github.com/darriola1/dubra-api.git
cd dubra-api
```

Instalar dependencias

```bash
npm install
```

## 🛈 Instala los siguientes dependencias, listadas a medida que se fue construyendo la API

| Paso | Comando                                                     | Descripción                                                |
| ---- | ----------------------------------------------------------- | ---------------------------------------------------------- |
| 1    | `npm install express`                                       | Framework web principal (routing, middlewares)             |
|      | `npm install --save-dev typescript`                         | Compilador TypeScript                                      |
|      | `npm install --save-dev tsx`                                | Ejecutar TS sin compilar (modo desarrollo)                 |
|      | `npm install --save-dev @types/express`                     | Tipos para Express                                         |
|      | `npm install --save-dev @types/node`                        | Tipos para Node.js                                         |
|      | `npm install dotenv`                                        | Cargar variables desde `.env`                              |
| -    | -                                                           | -                                                          |
| 2    | `npm install --save-dev prisma`                             | CLI de Prisma para desarrollo                              |
|      | `npm install @prisma/client`                                | Cliente Prisma para producción                             |
|      | `npx prisma init`                                           | Crea `prisma/schema.prisma` y `.env`                       |
| -    | -                                                           | -                                                          |
| 3    | `npm install bcryptjs`                                      | Hash de contraseñas                                        |
|      | `npm install jsonwebtoken`                                  | Autenticación con JWT                                      |
|      | `npm install @types/jsonwebtoken`                           | Tipado para JWT                                            |
|      | `npm install zod`                                           | Validaciones de datos                                      |
| -    | -                                                           | -                                                          |
| 4    | `npm install --save-dev jest @types/jest ts-jest supertest` | Testing con Jest, tipado y test de endpoints con Supertest |
|      | `npm install --save-dev ts-node`                            | Requerido por Jest al ejecutar TS directamente             |
|      | `npm install --save-dev cross-env`                          | Para ejecutar test sin modificar el entorno de node        |

---

## 🧪 Para ejecutar los test

| Comando                 | Descripción                                                                 |
| ----------------------- | --------------------------------------------------------------------------- |
| `npm run test`          | Ejecuta todos los tests una sola vez usando Jest.                           |
| `npm run test:watch`    | Ejecuta los tests y vuelve a correrlos automáticamente al detectar cambios. |
| `npm run test:coverage` | Ejecuta los tests y muestra un reporte de cobertura del código (coverage).  |

---

## 🐳 Uso con Docker

Si vas a correrlo con Docker:

```bash
# Construir e iniciar con docker-compose
docker-compose up --build
```

---

## 📦 Comandos Útiles

### 🐳 Docker

| Comando                            | Descripción                                 |
| ---------------------------------- | ------------------------------------------- |
| `docker build -t nombre .`         | Construye una imagen desde el Dockerfile    |
| `docker images`                    | Lista las imágenes disponibles              |
| `docker ps`                        | Lista los contenedores corriendo            |
| `docker ps -a`                     | Lista todos los contenedores                |
| `docker run -p 3000:3000 imagen`   | Corre una imagen en un contenedor           |
| `docker stop nombre`               | Detiene un contenedor                       |
| `docker rm nombre`                 | Elimina un contenedor detenido              |
| `docker rmi imagen`                | Elimina una imagen                          |
| `docker compose build`             | Reconstruye las imágenes                    |
| `docker-compose up`                | Levanta los servicios definidos             |
| `docker-compose up --build`        | Reconstruye las imágenes y levanta todo     |
| `docker compose exec dubra-api sh` | Entrar a la consola del contenedor          |
| `docker-compose down`              | Detiene y elimina los contenedores/red/vol. |

### 🛠️ Prisma

| Comando                     | Descripción                                   |
| --------------------------- | --------------------------------------------- |
| `npx prisma init`           | Crea `schema.prisma` y `.env` si no existe    |
| `npx prisma db push`        | Aplica el esquema a la DB **sin migraciones** |
| `npx prisma migrate dev`    | Crea y aplica una migración (entorno dev)     |
| `npx prisma migrate reset`  | Resetea la DB y corre migraciones             |
| `npx prisma generate`       | Genera el cliente Prisma                      |
| `npx prisma studio`         | Abre interfaz web para explorar la DB         |
| `npx prisma format`         | Formatea el archivo `schema.prisma`           |
| `npx prisma validate`       | Valida que el schema sea correcto             |
| `npx prisma migrate deploy` | Aplica migraciones en **entorno producción**  |

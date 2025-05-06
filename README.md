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
.env                       # Configuraciones de entorno
prisma/
└── schema.prisma          # Modelo de datos y migraciones
Dockerfile
docker-compose.yml
tsconfig.json
```

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

```bash
# 1. Instala dependencias
npm install express                        # Framework web principal (routing, middlewares)
npm install --save-dev typescript          # Compilador TypeScript
npm install --save-dev tsx                 # Para ejecutar TS sin compilar (modo dev)
npm install --save-dev @types/express      # Tipos para Express
npm install --save-dev @types/node         # Tipos para Node.js
npm install dotenv                         # Cargar variables desde .env

# 2. Instalar Prisma y cliente
npm install prisma --save-dev       # Paquete principal en modo desarrollo
npm install @prisma/client          # Cliente Prisma para producción
npx prisma init                     # Crea prisma/schema.prisma y .env

# 3. Utilidades
npm install bcryptjs                # Hash de contraseñas
npm install jsonwebtoken            # JWT para auth
npm install @types/jsonwebtoken     # Tipado para JWT
npm install zod                     # Validaciones

# 4. Dependecias de testing
npm install -D jest @types/jest ts-jest supertest # Jest+Supertest y tipado
npm install -D ts-node # Dependecia para jest. Da error si no esta instalado
```

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
| `npx prisma init`           | Crea `schema.prisma` y `.env`                 |
| `npx prisma db push`        | Aplica el esquema a la DB **sin migraciones** |
| `npx prisma migrate dev`    | Crea y aplica una migración (entorno dev)     |
| `npx prisma migrate reset`  | Resetea la DB y corre migraciones             |
| `npx prisma generate`       | Genera el cliente Prisma                      |
| `npx prisma studio`         | Abre interfaz web para explorar la DB         |
| `npx prisma format`         | Formatea el archivo `schema.prisma`           |
| `npx prisma validate`       | Valida que el schema sea correcto             |
| `npx prisma migrate deploy` | Aplica migraciones en **entorno producción**  |

# NexaBank conectado

Esta versión conecta el frontend React con `nexabank-api` de Spring Boot.

## 1. Configurar Firebase

En Firebase Console:

1. Abre el proyecto de NexaBank.
2. Ve a Authentication.
3. Activa `Email/Password`.
4. Crea un usuario de prueba.
5. Ve a Project settings > Your apps.
6. Crea o usa una aplicación Web.
7. Copia sus datos en `.env`.

Copia:

```text
.env.example
```

como:

```text
.env
```

y completa los valores.

Importante: el correo del usuario de Firebase debe existir también en la colección `users` de Firestore si quieres ver los datos creados por el seed.

El seed incluido en el backend crea:

```text
juan.restr@nexabank.com
```

como usuario de datos de ejemplo.

## 2. Configurar Firebase Admin en Spring Boot

El backend necesita las credenciales del SDK Admin.

Puedes usar el archivo:

```text
src/main/resources/firebase-service-account.json
```

o variables de entorno:

```text
FIREBASE_PROJECT_ID
FIREBASE_CLIENT_EMAIL
FIREBASE_PRIVATE_KEY
```

No subas las credenciales privadas a GitHub.

## 3. Ejecutar backend

Desde:

```text
nexabank/nexabank-api
```

ejecuta:

```bash
mvn spring-boot:run
```

La API queda en:

```text
http://localhost:8080
```

## 4. Ejecutar frontend

Desde:

```text
nexabank/nexabank-frontend
```

ejecuta:

```bash
npm install
npm run dev
```

Vite normalmente abrirá:

```text
http://localhost:5173
```

## 5. Flujo de autenticación

El frontend no envía la contraseña a Spring Boot.

El flujo es:

```text
React
  |
  | correo + contraseña
  v
Firebase Authentication
  |
  | Firebase ID Token
  v
React
  |
  | Authorization: Bearer TOKEN
  v
Spring Security
  |
  v
Firebase Admin
  |
  v
NexaBank API
```

## 6. Datos del seed

El backend tiene un endpoint:

```text
POST /api/v1/seed
```

Después de iniciar el backend puedes ejecutarlo para crear datos de prueba.

El seed crea usuarios, cuentas, transacciones y benchmarks.

## 7. Páginas conectadas

### Dashboard

Consume:

```text
GET /api/v1/accounts
GET /api/v1/transactions
```

### Transacciones

Consume:

```text
GET /api/v1/transactions
```

### Algoritmos

Consume:

```text
POST /api/v1/algorithms/sort
POST /api/v1/algorithms/search
```

### Benchmarks

Consume:

```text
GET  /api/v1/benchmarks
GET  /api/v1/benchmarks/{runId}/results
POST /api/v1/benchmarks/execute
```

## 8. Algo importante

El frontend ya no usa `mock.ts` para las páginas principales.

Los datos vienen del backend.

La única configuración que sigue dependiendo de tu máquina es Firebase y las credenciales del backend.

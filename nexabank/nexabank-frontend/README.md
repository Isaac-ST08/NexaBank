# NexaBank Frontend

Frontend React + Vite + TypeScript + Tailwind para la propuesta Full-Stack de NexaBank.

## Incluye

- Login con JWT listo para conectar a `/api/auth/login`.
- Dashboard con KPIs, cuentas y transacciones recientes.
- Transacciones con búsqueda, filtros y ordenamiento.
- Algorithms Playground para MergeSort, QuickSort y BinarySearch.
- Benchmarks con Recharts y tabla de resultados JMH.
- Cliente Axios preparado para JWT.
- Datos mock para que la interfaz funcione aunque el backend todavía no esté levantado.
- Estructura preparada para el contrato de API del documento de planificación.

## Ejecutar

```bash
npm install
npm run dev
```

Abrir `http://localhost:5173`.

Backend esperado:

```text
http://localhost:8080/api
```

Para cambiarlo:

```env
VITE_API_URL=http://localhost:8080/api
```

## Build y tests

```bash
npm run build
npm test
```

## Integración

Cuando `nexabank-api` esté corriendo, el frontend ya tiene clientes para:

- `POST /api/auth/login`
- `GET /api/transactions?page=&size=&sort=`
- `GET /api/accounts/{id}`
- `POST /api/algorithms/sort`
- `POST /api/algorithms/search`
- `GET /api/benchmarks/results`

Los mocks se pueden retirar progresivamente en favor de React Query + endpoints reales.

## Estructura

```text
src/
├── api/
│   ├── client.ts
│   ├── auth.api.ts
│   ├── transactions.api.ts
│   ├── algorithms.api.ts
│   ├── benchmarks.api.ts
│   └── mock.ts
├── components/
│   ├── Layout.tsx
│   └── ui.tsx
├── pages/
│   ├── LoginPage.tsx
│   ├── DashboardPage.tsx
│   ├── TransactionsPage.tsx
│   ├── AlgorithmsPage.tsx
│   └── BenchmarksPage.tsx
├── types/
│   └── index.ts
└── App.tsx
```

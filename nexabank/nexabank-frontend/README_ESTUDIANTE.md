# NexaBank Frontend - versión explicada

Esta versión conserva el funcionamiento del frontend, pero el código está
escrito de una forma más explícita y fácil de estudiar.

## Flujo principal

```text
main.tsx
   ↓
App.tsx
   ↓
Layout.tsx
   ↓
Página seleccionada
   ↓
api/*.ts
   ↓
Spring Boot
```

## ¿Qué hace cada parte?

### main.tsx
Es el punto de entrada de React. Aquí se crea la aplicación y se activan
React Router y React Query.

### App.tsx
Define las rutas:

- /login
- /dashboard
- /transactions
- /algorithms
- /benchmarks

También revisa si existe el token guardado en localStorage.

### Layout.tsx
Contiene el menú lateral, la barra superior y el `<Outlet />`.
El Outlet es el lugar donde React Router muestra la página actual.

### pages/
Cada archivo representa una pantalla del sistema.

### components/ui.tsx
Tiene componentes que se reutilizan, como Button, Card, Badge y PageTitle.

### api/
Aquí están las funciones que hablan con Spring Boot usando Axios.

### types/
Aquí están las interfaces de TypeScript. Sirven para indicar cómo deben
ser los objetos de transacciones, cuentas, algoritmos y benchmarks.

### api/mock.ts
Contiene datos de prueba. Se usan mientras el backend todavía no está
conectado.

## Conceptos que debes poder explicar al profesor

### useState

```tsx
const [search, setSearch] = useState("");
```

`search` guarda un dato y `setSearch` permite cambiarlo.

### onChange

```tsx
onChange={(event) => setSearch(event.target.value)}
```

Cada vez que el usuario escribe, se actualiza el estado.

### map

```tsx
mockTransactions.map((transaction) => (
  <p>{transaction.description}</p>
))
```

Recorre un arreglo y crea elementos HTML/JSX.

### filter

Se utiliza para mostrar solamente los elementos que cumplen una condición.

### useMemo

Se utiliza en la página de transacciones y algoritmos para calcular datos
a partir de otros datos y evitar hacer el cálculo innecesariamente.

### async / await

Se utilizan para esperar respuestas del backend.

```tsx
const response = await api.get("/transactions");
```

### Axios

Axios es la librería que utilizamos para enviar peticiones HTTP al backend.

### localStorage

Guarda información sencilla en el navegador. En NexaBank guardamos el JWT.

### React Router

Permite cambiar de página sin recargar completamente el navegador.

## Importante

Actualmente algunas páginas utilizan `mock.ts`, por lo que los datos todavía
son de prueba.

El siguiente paso del proyecto es conectar:

```text
React
  ↓ Axios
Spring Boot
  ↓ JPA
PostgreSQL
```

y reemplazar los mocks por las respuestas reales de la API.

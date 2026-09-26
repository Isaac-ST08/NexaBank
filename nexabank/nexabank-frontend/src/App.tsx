import { Navigate, Route, Routes } from "react-router-dom";

import { Layout } from "./components/Layout";
import LoginPage from "./pages/LoginPage";
import DashboardPage from "./pages/DashboardPage";
import TransactionsPage from "./pages/TransactionsPage";
import AlgorithmsPage from "./pages/AlgorithmsPage";
import BenchmarksPage from "./pages/BenchmarksPage";

// Este componente revisa si el usuario tiene una sesión guardada.
// Si no tiene sesión, lo manda a la página de Login.
function ProtectedRoute() {
  const token = localStorage.getItem("nexabank_token");

  if (token) {
    return <Layout />;
  }

  return <Navigate to="/login" replace />;
}

function App() {
  const token = localStorage.getItem("nexabank_token");

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/transactions" element={<TransactionsPage />} />
        <Route path="/algorithms" element={<AlgorithmsPage />} />
        <Route path="/benchmarks" element={<BenchmarksPage />} />
      </Route>

      <Route
        path="*"
        element={
          <Navigate
            to={token ? "/dashboard" : "/login"}
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;

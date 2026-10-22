import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import LoginPage from "./pages/LoginPage.jsx";
import DashboardPage from "./pages/DashboardPage.jsx";
import SalesPage from "./pages/SalesPage.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import IngredientsPage from "./pages/IngredientsPage.jsx";
import InventoryPage from "./pages/InventoryPage.jsx";
import ForecastPage from "./pages/ForecastPage.jsx";
import RecommendationsPage from "./pages/RecommendationsPage.jsx";

import AppLayout from "./components/layout/AppLayout.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<LoginPage />}
        />

        <Route element={<AppLayout />}>
          <Route
            path="/dashboard"
            element={<DashboardPage />}
          />

          <Route
            path="/ventas"
            element={<SalesPage />}
          />

          <Route
            path="/productos"
            element={<ProductsPage />}
          />

          <Route
            path="/ingredientes"
            element={<IngredientsPage />}
          />

          <Route
            path="/inventario"
            element={<InventoryPage />}
          />

          <Route
            path="/pronostico"
            element={<ForecastPage />}
          />

          <Route
            path="/recomendaciones"
            element={<RecommendationsPage />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
import { useState } from "react";
import "../styles/recommendations.css";

function RecommendationsPage() {
  const [recommendations, setRecommendations] = useState([
    {
      id: 1,
      product: "Cheesecake",
      estimatedDemand: 12,
      recommendedProduction: 13,
      confirmedProduction: 13,
    },
    {
      id: 2,
      product: "Torta de chocolate",
      estimatedDemand: 7,
      recommendedProduction: 8,
      confirmedProduction: 8,
    },
    {
      id: 3,
      product: "Brownie",
      estimatedDemand: 18,
      recommendedProduction: 20,
      confirmedProduction: 20,
    },
  ]);

  // Datos simulados por ahora.
  const ingredientRequirements = [
    {
      ingredient: "Harina",
      required: 8,
      available: 12,
      unit: "kg",
    },
    {
      ingredient: "Azúcar",
      required: 6,
      available: 4,
      unit: "kg",
    },
    {
      ingredient: "Huevos",
      required: 30,
      available: 36,
      unit: "unidades",
    },
    {
      ingredient: "Chocolate",
      required: 3.5,
      available: 2,
      unit: "kg",
    },
    {
      ingredient: "Queso crema",
      required: 4,
      available: 6,
      unit: "kg",
    },
  ];

  const handleProductionChange = (id, value) => {
    const quantity = Number(value);

    if (quantity < 0) {
      return;
    }

    setRecommendations((currentRecommendations) =>
      currentRecommendations.map((recommendation) =>
        recommendation.id === id
          ? {
              ...recommendation,
              confirmedProduction: quantity,
            }
          : recommendation
      )
    );
  };

  const handleConfirm = () => {
    alert("Planificación confirmada correctamente.");
  };

  return (
    <div className="recommendations-page">
      <header className="recommendations-header">
        <div>
          <h1>Recomendaciones</h1>
          <p>
            Revisa y ajusta la producción recomendada antes de
            confirmar la planificación.
          </p>
        </div>
      </header>

      <section className="recommendations-card">
        <div className="section-header">
            <h2>Producción recomendada</h2>

            <button className="primary-button">
            Confirmar planificación
            </button>
        </div>

        <table>
            <thead>
            <tr>
                <th>Producto</th>
                <th>Demanda estimada</th>
                <th>Recomendación</th>
                <th>Producción final</th>
            </tr>
            </thead>

            <tbody>
            {recommendations.map((item) => (
                <tr key={item.id}>
                <td>{item.product}</td>
                <td>{item.estimatedDemand}</td>
                <td>{item.recommendedProduction}</td>
                <td>
                    <input
                    type="number"
                    value={item.finalProduction}
                    onChange={(event) =>
                        handleProductionChange(item.id, event.target.value)
                    }
                    />
                </td>
                </tr>
            ))}
            </tbody>
        </table>
        </section>

      <section className="recommendations-card">
        <h2>Ingredientes necesarios</h2>

        <p className="section-description">
          Comparación entre los ingredientes necesarios para la
          producción y el inventario disponible.
        </p>

        <table>
          <thead>
            <tr>
              <th>Ingrediente</th>
              <th>Necesario</th>
              <th>Disponible</th>
              <th>Faltante</th>
              <th>Estado</th>
            </tr>
          </thead>

          <tbody>
            {ingredientRequirements.map((item) => {
              const missing = Math.max(
                0,
                item.required - item.available
              );

              const enoughStock = missing === 0;

              return (
                <tr key={item.ingredient}>
                  <td>{item.ingredient}</td>

                  <td>
                    {item.required} {item.unit}
                  </td>

                  <td>
                    {item.available} {item.unit}
                  </td>

                  <td>
                    {missing} {item.unit}
                  </td>

                  <td>
                    <span
                      className={
                        enoughStock
                          ? "requirement-status available"
                          : "requirement-status missing"
                      }
                    >
                      {enoughStock
                        ? "Suficiente"
                        : "Faltante"}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
    </div>
  );
}

export default RecommendationsPage;
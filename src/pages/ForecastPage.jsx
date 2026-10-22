import { useState } from "react";
import "../styles/forecast.css";

function ForecastPage() {
  const [selectedDate, setSelectedDate] = useState("2026-10-06");
  const [forecastGenerated, setForecastGenerated] = useState(false);

  // Datos simulados por ahora
  const externalData = {
    temperature: 21,
    condition: "Parcialmente nublado",
    precipitation: 10,
    holiday: false,
    event: "Sin festividad relevante",
  };

  const predictions = [
    {
      id: 1,
      product: "Cheesecake",
      estimatedDemand: 12,
      recommendedProduction: 13,
    },
    {
      id: 2,
      product: "Torta de chocolate",
      estimatedDemand: 7,
      recommendedProduction: 8,
    },
    {
      id: 3,
      product: "Brownie",
      estimatedDemand: 18,
      recommendedProduction: 20,
    },
  ];

  const handleGenerateForecast = () => {
    if (!selectedDate) {
      alert("Debes seleccionar una fecha.");
      return;
    }

    setForecastGenerated(true);
  };

  return (
    <div className="forecast-page">
      <header className="forecast-header">
        <div>
          <h1>Pronóstico de demanda</h1>
          <p>
            Estimación de demanda y producción recomendada.
          </p>
        </div>
      </header>

      <section className="forecast-config">
        <div className="forecast-date">
          <label htmlFor="forecastDate">
            Fecha de planificación
          </label>

          <input
            id="forecastDate"
            type="date"
            value={selectedDate}
            onChange={(event) => {
              setSelectedDate(event.target.value);
              setForecastGenerated(false);
            }}
          />
        </div>

        <button
          className="primary-button"
          onClick={handleGenerateForecast}
        >
          Generar pronóstico
        </button>
      </section>

      <section className="external-data-grid">
        <div className="context-card">
          <span>Temperatura</span>
          <strong>{externalData.temperature} °C</strong>
        </div>

        <div className="context-card">
          <span>Clima</span>
          <strong>{externalData.condition}</strong>
        </div>

        <div className="context-card">
          <span>Precipitación</span>
          <strong>{externalData.precipitation}%</strong>
        </div>

        <div className="context-card">
          <span>Calendario</span>
          <strong>
            {externalData.holiday
              ? "Feriado"
              : externalData.event}
          </strong>
        </div>
      </section>

      <section className="forecast-info">
        <h2>Variables consideradas</h2>

        <div className="forecast-tags">
          <span>Ventas históricas</span>
          <span>Día de la semana</span>
          <span>Clima</span>
          <span>Feriados y festividades</span>
        </div>
      </section>

      {forecastGenerated ? (
        <section className="forecast-results">
          <div className="forecast-results-header">
            <div>
              <h2>Resultado del pronóstico</h2>
              <p>
                Planificación para {selectedDate}
              </p>
            </div>
          </div>

          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Demanda estimada</th>
                <th>Producción recomendada</th>
              </tr>
            </thead>

            <tbody>
              {predictions.map((prediction) => (
                <tr key={prediction.id}>
                  <td>{prediction.product}</td>
                  <td>
                    {prediction.estimatedDemand} unidades
                  </td>
                  <td>
                    <strong>
                      {prediction.recommendedProduction}
                    </strong>{" "}
                    unidades
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <section className="forecast-empty">
          <p>
            Selecciona una fecha y genera el pronóstico para
            visualizar la demanda estimada.
          </p>
        </section>
      )}
    </div>
  );
}

export default ForecastPage;
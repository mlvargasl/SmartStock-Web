import "../styles/dashboard.css";

function DashboardPage() {
  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div>
          <h1>Inicio</h1>
          <p>Resumen general de SmartStock</p>
        </div>

        <div className="dashboard-date">
          5 de octubre de 2026
        </div>
      </header>

      <section className="summary-grid">
        <div className="summary-card">
          <span>Ventas últimos 7 días</span>
          <strong>125</strong>
          <small>unidades</small>
        </div>

        <div className="summary-card">
          <span>Productos</span>
          <strong>8</strong>
          <small>registrados</small>
        </div>

        <div className="summary-card">
          <span>Ingredientes</span>
          <strong>15</strong>
          <small>registrados</small>
        </div>

        <div className="summary-card warning">
          <span>Stock bajo</span>
          <strong>3</strong>
          <small>ingredientes</small>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="dashboard-panel">
          <h2>Ventas recientes</h2>

          <div className="placeholder-chart">
            Aquí agregaremos el gráfico de ventas
          </div>
        </div>

        <div className="dashboard-panel">
          <h2>Próxima acción</h2>

          <p>
            Genera el pronóstico de demanda para planificar
            la producción del siguiente período.
          </p>

          <button className="primary-button">
            Generar pronóstico
          </button>
        </div>
      </section>
    </div>
  );
}

export default DashboardPage;
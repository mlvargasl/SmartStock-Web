import { useState } from "react";
import "../styles/sales.css";

function SalesPage() {
  const [sales, setSales] = useState([
    {
      id: 1,
      date: "2026-10-05",
      product: "Cheesecake",
      quantity: 8,
    },
    {
      id: 2,
      date: "2026-10-05",
      product: "Torta de chocolate",
      quantity: 5,
    },
  ]);

  const [form, setForm] = useState({
    date: "",
    product: "",
    quantity: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.date || !form.product || !form.quantity) {
      alert("Debes completar todos los campos.");
      return;
    }

    const newSale = {
      id: Date.now(),
      date: form.date,
      product: form.product,
      quantity: Number(form.quantity),
    };

    setSales((currentSales) => [
      ...currentSales,
      newSale,
    ]);

    setForm({
      date: "",
      product: "",
      quantity: "",
    });
  };

  const handleCsvImport = (event) => {
    const file = event.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target.result;

      const lines = text
        .split("\n")
        .map((line) => line.trim())
        .filter((line) => line !== "");

      if (lines.length < 2) {
        alert("El archivo CSV no contiene datos.");
        return;
      }

      const headers = lines[0]
        .split(",")
        .map((header) => header.trim().toLowerCase());

      const expectedHeaders = [
        "fecha",
        "producto",
        "cantidad",
      ];

      const validHeaders = expectedHeaders.every((header) =>
        headers.includes(header)
      );

      if (!validHeaders) {
        alert(
          "El CSV debe contener las columnas: fecha, producto y cantidad."
        );
        return;
      }

      const importedSales = lines
        .slice(1)
        .map((line, index) => {
          const values = line
            .split(",")
            .map((value) => value.trim());

          const row = {};

          headers.forEach((header, i) => {
            row[header] = values[i];
          });

          return {
            id: Date.now() + index,
            date: row.fecha,
            product: row.producto,
            quantity: Number(row.cantidad),
          };
        });

      const invalidSale = importedSales.some(
        (sale) =>
          !sale.date ||
          !sale.product ||
          !Number.isFinite(sale.quantity) ||
          sale.quantity <= 0
      );

      if (invalidSale) {
        alert("El archivo contiene datos inválidos.");
        return;
      }

      setSales((currentSales) => [
        ...currentSales,
        ...importedSales,
      ]);

      alert("Ventas importadas correctamente.");

      event.target.value = "";
    };

    reader.readAsText(file);
  };

  return (
    <div className="sales-page">
      <div className="sales-header">
        <div>
          <h1>Ventas</h1>
          <p>
            Registro e historial de ventas de la pastelería.
          </p>
        </div>

        <div>
          <input
            id="csvInput"
            type="file"
            accept=".csv"
            onChange={handleCsvImport}
            hidden
          />

          <label
            htmlFor="csvInput"
            className="import-button"
          >
            Importar CSV
          </label>
        </div>
      </div>

      <div className="sales-content">
        <section className="sales-form-card">
          <h2>Registrar venta</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="date">Fecha</label>

              <input
                id="date"
                type="date"
                name="date"
                value={form.date}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="product">Producto</label>

              <input
                id="product"
                type="text"
                name="product"
                placeholder="Ej: Cheesecake"
                value={form.product}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Cantidad</label>

              <input
                id="quantity"
                type="number"
                name="quantity"
                min="1"
                value={form.quantity}
                onChange={handleChange}
              />
            </div>

            <button
              className="primary-button"
              type="submit"
            >
              Registrar venta
            </button>
          </form>
        </section>

        <section className="sales-table-card">
          <h2>Historial de ventas</h2>

          <table>
            <thead>
              <tr>
                <th>Fecha</th>
                <th>Producto</th>
                <th>Cantidad</th>
              </tr>
            </thead>

            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{sale.date}</td>
                  <td>{sale.product}</td>
                  <td>{sale.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default SalesPage;
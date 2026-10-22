import { useState } from "react";
import "../styles/inventory.css";

function InventoryPage() {
  const [inventory, setInventory] = useState([
    {
      id: 1,
      ingredient: "Harina",
      stock: 12,
      unit: "kg",
      minimumStock: 5,
    },
    {
      id: 2,
      ingredient: "Azúcar",
      stock: 4,
      unit: "kg",
      minimumStock: 5,
    },
    {
      id: 3,
      ingredient: "Huevos",
      stock: 36,
      unit: "unidad",
      minimumStock: 20,
    },
    {
      id: 4,
      ingredient: "Chocolate",
      stock: 2,
      unit: "kg",
      minimumStock: 3,
    },
    {
      id: 5,
      ingredient: "Queso crema",
      stock: 6,
      unit: "kg",
      minimumStock: 4,
    },
  ]);

  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [newStock, setNewStock] = useState("");

  const handleUpdateStock = (event) => {
    event.preventDefault();

    if (!selectedIngredient || newStock === "") {
      alert("Debes seleccionar un ingrediente e ingresar el stock.");
      return;
    }

    const stockValue = Number(newStock);

    if (stockValue < 0) {
      alert("El stock no puede ser negativo.");
      return;
    }

    setInventory((currentInventory) =>
      currentInventory.map((item) =>
        item.id === Number(selectedIngredient)
          ? {
              ...item,
              stock: stockValue,
            }
          : item
      )
    );

    setSelectedIngredient("");
    setNewStock("");
  };

  const lowStockCount = inventory.filter(
    (item) => item.stock <= item.minimumStock
  ).length;

  return (
    <div className="inventory-page">
      <header className="inventory-header">
        <div>
          <h1>Inventario</h1>
          <p>
            Consulta y actualiza el stock de ingredientes.
          </p>
        </div>

        <div className="inventory-summary">
          <span>Stock bajo</span>
          <strong>{lowStockCount}</strong>
        </div>
      </header>

      <div className="inventory-content">
        <section className="inventory-form-card">
          <h2>Actualizar stock</h2>

          <form onSubmit={handleUpdateStock}>
            <div className="form-group">
              <label htmlFor="ingredient">
                Ingrediente
              </label>

              <select
                id="ingredient"
                value={selectedIngredient}
                onChange={(event) =>
                  setSelectedIngredient(event.target.value)
                }
              >
                <option value="">
                  Seleccionar ingrediente
                </option>

                {inventory.map((item) => (
                  <option
                    key={item.id}
                    value={item.id}
                  >
                    {item.ingredient}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="newStock">
                Nuevo stock
              </label>

              <input
                id="newStock"
                type="number"
                min="0"
                step="0.01"
                value={newStock}
                onChange={(event) =>
                  setNewStock(event.target.value)
                }
              />
            </div>

            <button
              type="submit"
              className="primary-button"
            >
              Actualizar stock
            </button>
          </form>
        </section>

        <section className="inventory-table-card">
          <h2>Inventario actual</h2>

          <table>
            <thead>
              <tr>
                <th>Ingrediente</th>
                <th>Stock actual</th>
                <th>Unidad</th>
                <th>Stock mínimo</th>
                <th>Estado</th>
              </tr>
            </thead>

            <tbody>
              {inventory.map((item) => {
                const isLowStock =
                  item.stock <= item.minimumStock;

                return (
                  <tr key={item.id}>
                    <td>{item.ingredient}</td>
                    <td>{item.stock}</td>
                    <td>{item.unit}</td>
                    <td>{item.minimumStock}</td>

                    <td>
                      <span
                        className={
                          isLowStock
                            ? "stock-status low"
                            : "stock-status ok"
                        }
                      >
                        {isLowStock
                          ? "Stock bajo"
                          : "Disponible"}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default InventoryPage;
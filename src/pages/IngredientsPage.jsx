import { useState } from "react";
import "../styles/catalog.css";

function IngredientsPage() {
  const [ingredients, setIngredients] = useState([
    { id: 1, name: "Harina", unit: "kg" },
    { id: 2, name: "Azúcar", unit: "kg" },
    { id: 3, name: "Huevos", unit: "unidad" },
    { id: 4, name: "Chocolate", unit: "kg" },
  ]);

  const [form, setForm] = useState({
    name: "",
    unit: "",
  });

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!form.name.trim() || !form.unit) {
      alert("Debes completar todos los campos.");
      return;
    }

    const alreadyExists = ingredients.some(
      (ingredient) =>
        ingredient.name.toLowerCase() ===
        form.name.trim().toLowerCase()
    );

    if (alreadyExists) {
      alert("El ingrediente ya está registrado.");
      return;
    }

    setIngredients((currentIngredients) => [
      ...currentIngredients,
      {
        id: Date.now(),
        name: form.name.trim(),
        unit: form.unit,
      },
    ]);

    setForm({
      name: "",
      unit: "",
    });
  };

  return (
    <div className="catalog-page">
      <header className="catalog-header">
        <div>
          <h1>Ingredientes</h1>
          <p>
            Gestión de ingredientes utilizados en las recetas.
          </p>
        </div>
      </header>

      <div className="catalog-content">
        <section className="catalog-form-card">
          <h2>Registrar ingrediente</h2>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="ingredientName">
                Nombre
              </label>

              <input
                id="ingredientName"
                type="text"
                name="name"
                placeholder="Ej: Mantequilla"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label htmlFor="unit">
                Unidad de medida
              </label>

              <select
                id="unit"
                name="unit"
                value={form.unit}
                onChange={handleChange}
              >
                <option value="">
                  Seleccionar
                </option>
                <option value="kg">kg</option>
                <option value="g">g</option>
                <option value="l">litros</option>
                <option value="ml">ml</option>
                <option value="unidad">
                  unidad
                </option>
              </select>
            </div>

            <button
              className="primary-button"
              type="submit"
            >
              Registrar ingrediente
            </button>
          </form>
        </section>

        <section className="catalog-table-card">
          <h2>Ingredientes registrados</h2>

          <table>
            <thead>
              <tr>
                <th>Ingrediente</th>
                <th>Unidad</th>
              </tr>
            </thead>

            <tbody>
              {ingredients.map((ingredient) => (
                <tr key={ingredient.id}>
                  <td>{ingredient.name}</td>
                  <td>{ingredient.unit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
}

export default IngredientsPage;
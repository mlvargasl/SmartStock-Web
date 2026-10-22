import { useState } from "react";
import "../styles/recipes.css";

function RecipesPage() {
  const products = [
    { id: 1, name: "Cheesecake" },
    { id: 2, name: "Torta de chocolate" },
    { id: 3, name: "Brownie" },
  ];

  const ingredients = [
    { id: 1, name: "Harina", unit: "g" },
    { id: 2, name: "Azúcar", unit: "g" },
    { id: 3, name: "Huevos", unit: "unidad" },
    { id: 4, name: "Chocolate", unit: "g" },
    { id: 5, name: "Queso crema", unit: "g" },
  ];

  const [selectedProduct, setSelectedProduct] = useState("");
  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantity] = useState("");

  const [recipes, setRecipes] = useState({
    1: [
      {
        ingredientId: 5,
        ingredient: "Queso crema",
        quantity: 300,
        unit: "g",
      },
      {
        ingredientId: 2,
        ingredient: "Azúcar",
        quantity: 100,
        unit: "g",
      },
      {
        ingredientId: 3,
        ingredient: "Huevos",
        quantity: 3,
        unit: "unidad",
      },
    ],
  });

  const handleAddIngredient = (event) => {
    event.preventDefault();

    if (!selectedProduct || !selectedIngredient || !quantity) {
      alert("Debes completar todos los campos.");
      return;
    }

    const ingredient = ingredients.find(
      (item) => item.id === Number(selectedIngredient)
    );

    const currentRecipe = recipes[selectedProduct] || [];

    const alreadyExists = currentRecipe.some(
      (item) => item.ingredientId === ingredient.id
    );

    if (alreadyExists) {
      alert("Este ingrediente ya está en la receta.");
      return;
    }

    const newIngredient = {
      ingredientId: ingredient.id,
      ingredient: ingredient.name,
      quantity: Number(quantity),
      unit: ingredient.unit,
    };

    setRecipes({
      ...recipes,
      [selectedProduct]: [
        ...currentRecipe,
        newIngredient,
      ],
    });

    setSelectedIngredient("");
    setQuantity("");
  };

  const handleDeleteIngredient = (ingredientId) => {
    const currentRecipe = recipes[selectedProduct] || [];

    setRecipes({
      ...recipes,
      [selectedProduct]: currentRecipe.filter(
        (item) => item.ingredientId !== ingredientId
      ),
    });
  };

  const currentRecipe = recipes[selectedProduct] || [];

  const currentIngredient = ingredients.find(
    (ingredient) =>
      ingredient.id === Number(selectedIngredient)
  );

  return (
    <div className="recipes-page">
      <header className="recipes-header">
        <h1>Recetas</h1>
        <p>
          Define los ingredientes necesarios para producir una unidad
          de cada producto.
        </p>
      </header>

      <div className="recipes-product">
        <label htmlFor="product">
          Producto
        </label>

        <select
          id="product"
          value={selectedProduct}
          onChange={(event) =>
            setSelectedProduct(event.target.value)
          }
        >
          <option value="">
            Seleccionar producto
          </option>

          {products.map((product) => (
            <option
              key={product.id}
              value={product.id}
            >
              {product.name}
            </option>
          ))}
        </select>
      </div>

      {selectedProduct && (
        <div className="recipes-content">
          <section className="recipe-form-card">
            <h2>Agregar ingrediente</h2>

            <form onSubmit={handleAddIngredient}>
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

                  {ingredients.map((ingredient) => (
                    <option
                      key={ingredient.id}
                      value={ingredient.id}
                    >
                      {ingredient.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="quantity">
                  Cantidad
                  {currentIngredient &&
                    ` (${currentIngredient.unit})`}
                </label>

                <input
                  id="quantity"
                  type="number"
                  min="0"
                  step="0.01"
                  value={quantity}
                  onChange={(event) =>
                    setQuantity(event.target.value)
                  }
                />
              </div>

              <button
                type="submit"
                className="primary-button"
              >
                Agregar ingrediente
              </button>
            </form>
          </section>

          <section className="recipe-table-card">
            <h2>Ingredientes de la receta</h2>

            {currentRecipe.length === 0 ? (
              <p className="empty-message">
                Este producto todavía no tiene ingredientes registrados.
              </p>
            ) : (
              <table>
                <thead>
                  <tr>
                    <th>Ingrediente</th>
                    <th>Cantidad</th>
                    <th>Unidad</th>
                    <th>Acción</th>
                  </tr>
                </thead>

                <tbody>
                  {currentRecipe.map((item) => (
                    <tr key={item.ingredientId}>
                      <td>{item.ingredient}</td>
                      <td>{item.quantity}</td>
                      <td>{item.unit}</td>

                      <td>
                        <button
                          className="delete-button"
                          onClick={() =>
                            handleDeleteIngredient(
                              item.ingredientId
                            )
                          }
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </section>
        </div>
      )}
    </div>
  );
}

export default RecipesPage;
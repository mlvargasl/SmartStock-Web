import { useState } from "react";
import "../styles/catalog.css";

function ProductsPage() {
  const ingredients = [
    { id: 1, name: "Harina", unit: "g" },
    { id: 2, name: "Azúcar", unit: "g" },
    { id: 3, name: "Huevos", unit: "unidad" },
    { id: 4, name: "Chocolate", unit: "g" },
    { id: 5, name: "Queso crema", unit: "g" },
  ];

  const [products, setProducts] = useState([
    { id: 1, name: "Cheesecake", active: true },
    { id: 2, name: "Torta de chocolate", active: true },
    { id: 3, name: "Brownie", active: true },
  ]);

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

  const [productName, setProductName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [selectedIngredient, setSelectedIngredient] = useState("");
  const [quantity, setQuantity] = useState("");

  const handleAddProduct = (event) => {
    event.preventDefault();

    const cleanName = productName.trim();

    if (!cleanName) {
      alert("Debes ingresar el nombre del producto.");
      return;
    }

    const alreadyExists = products.some(
      (product) =>
        product.name.toLowerCase() === cleanName.toLowerCase()
    );

    if (alreadyExists) {
      alert("El producto ya está registrado.");
      return;
    }

    const newProduct = {
      id: Date.now(),
      name: cleanName,
      active: true,
    };

    setProducts((currentProducts) => [
      ...currentProducts,
      newProduct,
    ]);

    setProductName("");
  };

  const handleAddIngredient = (event) => {
    event.preventDefault();

    if (!selectedProduct || !selectedIngredient || !quantity) {
      alert("Debes completar todos los campos.");
      return;
    }

    const ingredient = ingredients.find(
      (item) => item.id === Number(selectedIngredient)
    );

    const currentRecipe = recipes[selectedProduct.id] || [];

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
      [selectedProduct.id]: [
        ...currentRecipe,
        newIngredient,
      ],
    });

    setSelectedIngredient("");
    setQuantity("");
  };

  const handleDeleteIngredient = (ingredientId) => {
    const currentRecipe = recipes[selectedProduct.id] || [];

    setRecipes({
      ...recipes,
      [selectedProduct.id]: currentRecipe.filter(
        (item) => item.ingredientId !== ingredientId
      ),
    });
  };

  const toggleProduct = (id) => {
    setProducts((currentProducts) =>
      currentProducts.map((product) =>
        product.id === id
          ? { ...product, active: !product.active }
          : product
      )
    );
  };

  const currentRecipe = selectedProduct
    ? recipes[selectedProduct.id] || []
    : [];

  const currentIngredient = ingredients.find(
    (ingredient) =>
      ingredient.id === Number(selectedIngredient)
  );

  return (
    <div className="catalog-page">
      <header className="catalog-header">
        <div>
          <h1>Productos</h1>
          <p>
            Gestión de productos y sus recetas.
          </p>
        </div>
      </header>

      <div className="catalog-content">
        <section className="catalog-form-card">
          <h2>Registrar producto</h2>

          <form onSubmit={handleAddProduct}>
            <div className="form-group">
              <label htmlFor="productName">
                Nombre del producto
              </label>

              <input
                id="productName"
                type="text"
                placeholder="Ej: Pie de limón"
                value={productName}
                onChange={(event) =>
                  setProductName(event.target.value)
                }
              />
            </div>

            <button
              className="primary-button"
              type="submit"
            >
              Registrar producto
            </button>
          </form>
        </section>

        <section className="catalog-table-card">
          <h2>Productos registrados</h2>

          <table>
            <thead>
              <tr>
                <th>Producto</th>
                <th>Estado</th>
                <th>Receta</th>
                <th>Acción</th>
              </tr>
            </thead>

            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>

                  <td>
                    <span
                      className={
                        product.active
                          ? "status active"
                          : "status inactive"
                      }
                    >
                      {product.active
                        ? "Activo"
                        : "Inactivo"}
                    </span>
                  </td>

                  <td>
                    <button
                      className="secondary-button"
                      onClick={() =>
                        setSelectedProduct(product)
                      }
                    >
                      Ver receta
                    </button>
                  </td>

                  <td>
                    <button
                      className="secondary-button"
                      onClick={() =>
                        toggleProduct(product.id)
                      }
                    >
                      {product.active
                        ? "Desactivar"
                        : "Activar"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </div>

      {selectedProduct && (
        <section className="recipe-section">
          <div className="recipe-section-header">
            <div>
              <h2>
                Receta: {selectedProduct.name}
              </h2>

              <p>
                Ingredientes necesarios para producir una unidad.
              </p>
            </div>

            <button
              className="secondary-button"
              onClick={() =>
                setSelectedProduct(null)
              }
            >
              Cerrar
            </button>
          </div>

          <div className="recipes-content">
            <div className="catalog-form-card">
              <h3>Agregar ingrediente</h3>

              <form onSubmit={handleAddIngredient}>
                <div className="form-group">
                  <label htmlFor="ingredient">
                    Ingrediente
                  </label>

                  <select
                    id="ingredient"
                    value={selectedIngredient}
                    onChange={(event) =>
                      setSelectedIngredient(
                        event.target.value
                      )
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
                  className="primary-button"
                  type="submit"
                >
                  Agregar ingrediente
                </button>
              </form>
            </div>

            <div className="catalog-table-card">
              <h3>Ingredientes de la receta</h3>

              {currentRecipe.length === 0 ? (
                <p>
                  Este producto todavía no tiene una receta registrada.
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
                            className="secondary-button"
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
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default ProductsPage;
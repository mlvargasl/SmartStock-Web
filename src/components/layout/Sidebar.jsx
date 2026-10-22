import { NavLink } from "react-router-dom";

function Sidebar() {
  const menuItems = [
    { name: "Inicio", path: "/dashboard" },
    { name: "Ventas", path: "/ventas" },
    { name: "Productos", path: "/productos" },
    { name: "Ingredientes", path: "/ingredientes" },
    { name: "Inventario", path: "/inventario" },
    { name: "Pronóstico", path: "/pronostico" },
    { name: "Recomendaciones", path: "/recomendaciones" },
  ];

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        SmartStock
      </div>

      <nav className="sidebar-menu">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-user">
        <strong>Administrador</strong>
        <span>Mellow Bakery</span>
      </div>
    </aside>
  );
}

export default Sidebar;
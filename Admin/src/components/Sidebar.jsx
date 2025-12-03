import { NavLink } from "react-router-dom";
import "../styles/Sidebar.css"; 
import logo from "../assets/logo.png";

import inicioIcon from "../assets/inicio.png";
import adopcionIcon from "../assets/adopcion.png";
import emergenciasIcon from "../assets/emergencias.png";
import apadrinamientoIcon from "../assets/padrinos.png";
import gestionPerrosIcon from "../assets/perro.png";
import gestionPadrinosIcon from "../assets/gestion_padrinos.png";

export default function Sidebar() {
  const menuItems = [
    { label: "Inicio", to: "/", icon: inicioIcon, exact: true },
    { label: "Solicitud de adopciones", to: "/solicitudes-adopcion", icon: adopcionIcon },
    { label: "Denuncias", to: "/denuncias", icon: emergenciasIcon },
    { label: "Solicitud de apadrinaciones", to: "/solicitudes-apadrinamiento", icon: apadrinamientoIcon },
    { label: "Gestión de perros", to: "/gestion-perros", icon: gestionPerrosIcon },
    { label: "Gestión de padrinos", to: "/gestion-padrinos", icon: gestionPadrinosIcon },
  ];

  return (
    <aside className="sidebar">
      <nav>
        <div className="sidebar-logo">
          <img src={logo} alt="Logo" />
        </div>

        <h2 className="brand">Admin Portal</h2>

        <ul>
          {menuItems.map((item, index) => (
            <li key={index}>
              <NavLink
                to={item.to}
                end={item.exact}
                className={({ isActive }) => (isActive ? "active menu-link" : "menu-link")}
                >
                <img src={item.icon} alt={item.label} className="menu-icon" />
                <span className="menu-text">{item.label}</span>
                </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
}
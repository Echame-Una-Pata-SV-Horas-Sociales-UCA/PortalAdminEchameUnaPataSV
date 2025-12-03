import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

import Inicio from "./pages/Inicio";
import SolicitudesAdopcion from "./pages/SolicitudesAdopcion";
import Denuncias from "./pages/Denuncias";
import SolicitudesApadrinamiento from "./pages/SolicitudesApadrinamiento";
import GestionPerros from "./pages/GestionPerros";
import GestionPadrinos from "./pages/GestionPadrinos";

import "./App.css"; 

export default function App() {
  return (
    <BrowserRouter>
      <div className="app-root">
        <Sidebar />
        <main className="content">
          <Routes>
            <Route path="/" element={<Inicio />} />
            <Route path="/solicitudes-adopcion" element={<SolicitudesAdopcion />} />
            <Route path="/denuncias" element={<Denuncias />} />
            <Route path="/solicitudes-apadrinamiento" element={<SolicitudesApadrinamiento />} />
            <Route path="/gestion-perros" element={<GestionPerros />} />
            <Route path="/gestion-padrinos" element={<GestionPadrinos />} />
            <Route path="*" element={<Inicio />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

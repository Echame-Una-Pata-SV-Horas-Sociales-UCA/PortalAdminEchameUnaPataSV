import { useState, useEffect } from "react";
import TablaPerros from "../tables/TablaPerros";
import FormNuevoPerro from "../components/FormNuevoPerro";
import { API_BASE_URL, AUTH_TOKEN } from "../config";

export default function GestionPerros() {
  const [showForm, setShowForm] = useState(false);
  const [perros, setPerros] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPerros = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/animal/find-all?page=0&size=10`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${AUTH_TOKEN}`
        }
      });

      if (!response.ok) throw new Error(`Error: ${response.status}`);

      const result = await response.json();
      
      const datosFormateados = result.data.map(item => ({
        id: item.id,
        nombre: item.name,
        animal: item.species, 
        raza: item.race,
        genero: item.sex,
        estado: "Disponible"
      }));

      setPerros(datosFormateados);

    } catch (error) {
      console.error("Error al obtener perros:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPerros();
  }, []);

  const handleNuevo = () => setShowForm(true);
  const handleClose = () => setShowForm(false);

  const handleSubmit = async (datosFormulario) => {
    const today = new Date().toISOString().split('T')[0];
    const formData = new FormData();

    formData.append("name", datosFormulario.nombre);
    
    formData.append("species", datosFormulario.especie); 
    
    formData.append("sex", datosFormulario.genero);
    formData.append("race", datosFormulario.raza);
    formData.append("birthDate", today);   
    formData.append("rescueDate", today);  
    formData.append("rescueLocation", datosFormulario.ubicacion);
    formData.append("initialDescription", datosFormulario.descripcion);
    formData.append("missingLimb", datosFormulario.amputado);
    formData.append("observations", datosFormulario.observaciones);

    if (datosFormulario.foto) {
      formData.append("photos", datosFormulario.foto);
    }

    const response = await fetch(`${API_BASE_URL}/animal/register`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${AUTH_TOKEN}`
      },
      body: formData
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Error en el servidor: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    console.log("Animal registrado:", data);

    await fetchPerros();
  };

  return (
    <div>
      <h2 className="page-title">Gestión de Animales</h2>

      <div className="acciones-tabla">
        <button className="btn-nuevo" onClick={handleNuevo}>
          <svg className="icono-svg" viewBox="0 0 24 24">
            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          NUEVO REGISTRO
        </button>

        <button className="btn-eliminar">
          <svg className="icono-svg" viewBox="0 0 24 24">
            <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          ELIMINAR
        </button>
      </div>

      {loading ? (
        <div style={{ 
          textAlign: "center", 
          padding: "40px", 
          color: "#666", 
          fontSize: "1.2rem",
          backgroundColor: "#f9f9f9",
          borderRadius: "8px",
          marginTop: "20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}>
          <svg 
            style={{ width: "24px", height: "24px", marginRight: "10px", animation: "spin 1s linear infinite" }} 
            viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          >
            <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
            <style>{`@keyframes spin { 100% { transform: rotate(360deg); } }`}</style>
          </svg>
          Cargando datos...
        </div>
      ) : (
        <TablaPerros data={perros} />
      )}

      {showForm && (
        <FormNuevoPerro
          onClose={handleClose}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
}
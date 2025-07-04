import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contextos/loginContext";
import useDataManager from "../../hooks/useDataManager";
import { toast } from "react-toastify";

function AdministrarUsuarios() {
  const { server } = useContext(LoginContext);
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarUsuarios = async () => {
    try {
      const response = await fetch(server + "/admin/usuarios/cargarUsuarios", {
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("sesion"),
        },
      });

      const json = await response.json();
      if (json.codigo !== 200) throw new Error("Error al cargar usuarios");

      setUsuarios(json.usuarios);
    } catch (err) {
      console.error(err);
      toast.error("Error al cargar usuarios");
    } finally {
      setLoading(false);
    }
  };

  const toggleUsuario = async (idUsuario) => {
    try {
      const response = await fetch(server + "/admin/usuarios/activarUsuario", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          auth: localStorage.getItem("sesion"),
        },
        body: JSON.stringify({ idUsuario }),
      });

      const json = await response.json();

      if (json.codigo == 200) {
        setUsuarios((prev) =>
          prev.map((u) =>
            u.id === idUsuario ? { ...u, activo: u.activo === 1 ? 0 : 1 } : u
          )
        );
        toast.success("Estado de usuario cambiado con éxito");
      } else {
        toast.error("No se pudo cambiar el estado del usuario");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error al cambiar estado");
    }
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const {
    dataPaginada,
    mostrarConteo,
    next,
    prev,
    puedeAvanzar,
    puedeRetroceder,
  } = useDataManager({ datos: usuarios });

  if (loading) return <div>Cargando usuarios...</div>;

  return (
    <div>
      <h4>Administrar usuarios</h4>
      <button className="btn btn-primary mb-3">Crear nuevo usuario</button>

      <div className="mb-3">
        <span>{mostrarConteo}</span><br />
        <button className="btn btn-primary me-2" onClick={prev} disabled={!puedeRetroceder}>Anterior</button>
        <button className="btn btn-primary" onClick={next} disabled={!puedeAvanzar}>Siguiente</button>
      </div>

      <table className="table table-striped">
        <thead className="table-primary">
          <tr>
            <th>id</th>
            <th>Avatar</th>
            <th>Nick AOE</th>
            <th>E-Mail</th>
            <th>Discord</th>
            <th>Link Steam</th>
            <th>Elo</th>
            <th>Tipo</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          {dataPaginada.map((usuario) => (
            <tr key={usuario.id}>
              <td>{usuario.id}</td>
              <td>
                <img
                  src={usuario.profPic || "https://demovanilla.ddns.net:456/fotos/logo.png"}
                  alt="avatar"
                  width="40"
                  height="40"
                  className="rounded-circle"
                />
              </td>
              <td>{usuario.Nombre}</td>
              <td>{usuario.email}</td>
              <td>{usuario.discord}</td>
              <td>
                <a href={usuario.steam} target="_blank" rel="noopener noreferrer">
                  Steam
                </a>
              </td>
              <td>{usuario.elo}</td>
              <td>{usuario.Tipo}</td>
              <td>
                <button
                  className={`btn btn-sm ${usuario.activo === 1 ? "btn-danger" : "btn-success"}`}
                  onClick={() => toggleUsuario(usuario.id)}
                >
                  {usuario.activo === 1 ? "Desactivar" : "Activar"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdministrarUsuarios;

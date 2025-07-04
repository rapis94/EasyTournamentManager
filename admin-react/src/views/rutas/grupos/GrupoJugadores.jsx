import useDataManager from "../../../hooks/useDataManager";
import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../../contextos/loginContext";
import { toast } from "react-toastify";

export default function GrupoJugadores({ grupo, grupos, setGrupo, actualizarGrupos }) {
  const { server } = useContext(LoginContext);
  const [animate, setAnimate] = useState(true);
  const {
    dataPaginada,
    next,
    prev,
    puedeAvanzar,
    puedeRetroceder,
  } = useDataManager({
    datos: grupo.inscripciones.map(inscripcion => ({
      ...inscripcion,
      comprobanteLink: (
        <a
          href={`https://demovanilla.ddns.net:456/fotos/comprobantes/${inscripcion.comprobante}`}
          target="_blank"
          rel="noreferrer"
        >
          Ver
        </a>
      ),
      cambiarGrupo: (
        <select
          defaultValue={grupo.id}
          onChange={(e) => cambiarGrupo(inscripcion.id, e.target.value)}
        >
          {grupos.map((g) => (
            <option key={g.id} value={g.id}>
              {g.Nombre}
            </option>
          ))}
        </select>
      ),
    }))
  });

  const cambiarGrupo = async (idPlayer, idGrupo) => {
    const response = await fetch(server + "/admin/grupos/cambiarGrupo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        auth: localStorage.getItem("sesion"),
      },
      body: JSON.stringify({ idPlayer, idGrupo }),
    });

    const json = await response.json();

    if (json.codigo === 200) {
      toast.success("Grupo actualizado");
      const jugador = grupo.inscripciones.find((i) => i.id === idPlayer);

      const nuevosGrupos = grupos.map((g) => {
        if (g.id === grupo.id) {
          return {
            ...g,
            inscripciones: g.inscripciones.filter((i) => i.id !== idPlayer),
          };
        } else if (g.id === Number(idGrupo)) {
          return {
            ...g,
            inscripciones: [...g.inscripciones, jugador],
          };
        }
        return g;
      });

      actualizarGrupos(nuevosGrupos);

      const nuevoGrupoSeleccionado = nuevosGrupos.find((g) => g.id === grupo.id);
      setGrupo(nuevoGrupoSeleccionado);
    } else {
      toast.error("Error al mover jugador");
    }
  };

  useEffect(() => {
    setAnimate(false);
  }, [grupo]);

  useEffect(() => {
    setAnimate(false);
    const timeout = setTimeout(() => setAnimate(true), 10);
    return () => clearTimeout(timeout);
  }, [grupo]);
  return (
    <div className={"mt-1 animate " + (animate ? "aparecer" : "")}>
      <h5>Jugadores del grupo: {grupo.Nombre}</h5>

      <button className="btn btn-primary me-2" onClick={prev} disabled={!puedeRetroceder}>Anterior</button>
      <button className="btn btn-primary" onClick={next} disabled={!puedeAvanzar}>Siguiente</button>

      <table className="table table-striped mt-3">
        <thead>
          <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Elo</th>
            <th>Comprobante</th>
            <th>Cambiar Grupo</th>
          </tr>
        </thead>
        <tbody>
          {dataPaginada.map((j) => (
            <tr key={j.id}>
              <td>{j.id}</td>
              <td>{j.Nombre}</td>
              <td>{j.elo}</td>
              <td>{j.comprobanteLink}</td>
              <td>{j.cambiarGrupo}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contextos/loginContext";
import useDataManager from "../../hooks/useDataManager";
import GrupoJugadores from "./grupos/GrupoJugadores";
import { toast } from "react-toastify";

function AdministrarGrupos() {
    const { server } = useContext(LoginContext);
    const [torneos, setTorneos] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [torneoSeleccionado, setTorneoSeleccionado] = useState(null);
    const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);

    const {
        dataPaginada,
        mostrarConteo,
        next,
        prev,
        puedeAvanzar,
        puedeRetroceder,
    } = useDataManager({
        datos: grupos,
        elementosPorPagina: 5,
        filtro: () => true,
        sort: "Nombre"
    });

    useEffect(() => {
        const cargarTorneos = async () => {
            try {
                const response = await fetch(server + "/admin/torneos/cargarTorneos", {
                    headers: {
                        "Content-Type": "application/json",
                        auth: localStorage.getItem("sesion"),
                    },
                });
                const json = await response.json();
                setTorneos(json.torneos || []);
            } catch (error) {
                toast.error("Error al cargar torneos");
            }
        };

        cargarTorneos();
    }, [server]);

    const seleccionarTorneo = async (idTorneo) => {
        try {
            const response = await fetch(server + "/admin/grupos/cargarGrupos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    auth: localStorage.getItem("sesion"),
                },
                body: JSON.stringify({ idTorneo }),
            });

            const json = await response.json();

            const gruposFormateados = (json.grupos || []).map((g) => ({
                ...g,
                playerCount: g.inscripciones?.length || 0,
            }));

            if (idTorneo !== torneoSeleccionado) {
                setTorneoSeleccionado(idTorneo);
            }

            setGrupos(gruposFormateados);
            setGrupoSeleccionado(null);
        } catch (error) {
            toast.error("Error al cargar grupos");
        }
    };

    const seleccionarGrupo = (idGrupo) => {
        const grupo = grupos.find((g) => g.id === idGrupo);
        setGrupoSeleccionado(grupo);
    };

    return (
        <div>
            <h4>Administrar Grupos</h4>

            <div className="form-floating mb-3">
                <select
                    className="form-select"
                    onChange={(e) => seleccionarTorneo(e.target.value)}
                    value={torneoSeleccionado || ""}
                >
                    <option value="" disabled>Selecciona un torneo</option>
                    {torneos.map((t) => (
                        <option key={t.id} value={t.id}>
                            {t.Nombre}
                        </option>
                    ))}
                </select>
                <label htmlFor="torneoSelect">Torneo</label>
            </div>

            <button className="btn btn-primary mb-3">Crear nuevo Grupo</button>

            {grupoSeleccionado && (
                <GrupoJugadores
                    grupo={grupoSeleccionado}
                    grupos={grupos}
                    setGrupo={setGrupoSeleccionado}
                    actualizarGrupos={setGrupos}
                />
            )}

            <div className="mb-3">
                <span>{mostrarConteo}</span><br />
                <button className="btn btn-primary me-2" onClick={prev} disabled={!puedeRetroceder}>Anterior</button>
                <button className="btn btn-primary" onClick={next} disabled={!puedeAvanzar}>Siguiente</button>
            </div>

            <table className="table table-striped">
                <thead className="table-primary">
                    <tr>
                        <th>id</th>
                        <th>Nombre</th>
                        <th>Jugadores</th>
                        <th>Seleccionar</th>
                    </tr>
                </thead>
                <tbody>
                    {dataPaginada.map((g) => (
                        <tr key={g.id}>
                            <td>{g.id}</td>
                            <td>{g.Nombre}</td>
                            <td>{g.playerCount}</td>
                            <td>
                                <button className="btn btn-primary" onClick={() => seleccionarGrupo(g.id)}>
                                    Ver Jugadores
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdministrarGrupos;

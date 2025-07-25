import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contextos/loginContext";
import useDataManager from "../../hooks/useDataManager";
import GrupoJugadores from "./grupos/GrupoJugadores";
import { toast } from "react-toastify";
import BasicModal from "../../componentes/system/modal";
import NuevaFase from "../../componentes/forms/grupos/NuevaFase";
import CrearGrupo from "../../componentes/forms/grupos/CrearGrupo";

function AdministrarGrupos() {
    const { server } = useContext(LoginContext);
    const [torneos, setTorneos] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [torneoSeleccionado, setTorneoSeleccionado] = useState(null);
    const [grupoSeleccionado, setGrupoSeleccionado] = useState(null);
    const [modal, setModal] = useState(null);
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

            if (idTorneo !== torneoSeleccionado?.id) {
                setTorneoSeleccionado(torneos.find(({id})=>id==idTorneo));
            }

            setGrupos(gruposFormateados);
            setGrupoSeleccionado(null);
        } catch (error) {
            console.error(error);
            toast.info("El torneo no tiene grupos o no fue posible cargarlos");
        }
    };

    const seleccionarGrupo = (idGrupo) => {
        const grupo = grupos.find((g) => g.id === idGrupo);
        setGrupoSeleccionado(grupo);
    };

    const crearFase = ()=>{
        setModal(<BasicModal titulo="Crear nueva fase"  onClose={()=>setModal(null)} contenido={<NuevaFase onSuccess={()=>setModal(null)} torneo={torneoSeleccionado} gruposOrigin={grupos}></NuevaFase>}></BasicModal>)
    }

    const grupoCreado = ()=>{
        seleccionarTorneo(torneoSeleccionado.id);
        setModal(null)
    }
    const crearGrupo = ()=>{
        setModal(<BasicModal titulo="Crear nuevo grupo"  onClose={()=>setModal(null)} contenido={<CrearGrupo onSuccess={grupoCreado} torneo={torneoSeleccionado} />}></BasicModal>)
    }

    return (
        <div className="aparecer">
            <h4>Administrar Grupos</h4>
            {modal}
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

            <button className="btn btn-primary mb-3" onClick={crearGrupo}>Crear nuevo Grupo</button> <button className="btn btn-primary mb-3" disabled={!torneoSeleccionado} onClick={crearFase}>Crear nueva fase</button>
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

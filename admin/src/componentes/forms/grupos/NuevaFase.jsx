import { useContext, useEffect, useRef, useState } from "react";
import { CampoGroup, FloatInput, FloatSelect } from "../../system/Campos";
import { BsExclamationCircleFill } from "react-icons/bs";
import { LoginContext } from "../../../contextos/loginContext";
import { toast } from "react-toastify";

export default function NuevaFase({ torneo, gruposOrigin, onSuccess=()=>{} }) {
    const ref = useRef();
    const { server } = useContext(LoginContext)
    const [grupoSelected, setGrupoSelected] = useState(null);
    const [grupos, setGrupos] = useState([...gruposOrigin]);
    const [showAsitant, setShowAsistant] = useState(null)
    const [nuevaFase, setNuevaFase] = useState({
        Nombre: "",
        inscripciones: []
    })

    const [orden, setOrden] = useState("");
    const puntosMap = { "0": 0, "1": 1, "2": 3, 0: 0, 1: 1, 2: 3 };
    const handleChange = (e) => {
        const data = e.target;
        setNuevaFase(prev => ({
            ...prev,
            [data.name]: data.value
        }))
    }

    const agregarJugador = (jugador) => {
        setNuevaFase(prev => {
            return {
                ...prev,
                inscripciones: [jugador, ...prev.inscripciones]
            }
        })
        setGrupos(prev => {
            const gruposNew = prev.map((grupo) => {
                if (grupo.id == jugador.idGrupo) {
                    grupo.inscripciones = grupo.inscripciones.filter(({ idUsuario }) => idUsuario != jugador.idUsuario);
                }
                return grupo;
            })

            return [...gruposNew]
        })
    }

    const quitarJugador = (jugador) => {
        setNuevaFase(prev => ({
            ...prev,
            inscripciones: prev.inscripciones.filter(({ idUsuario }) => idUsuario != jugador.idUsuario)

        }))
        setGrupos(prev => {
            const gruposNew = prev.map((grupo) => {
                if (grupo.id == jugador.idGrupo) {
                    grupo.inscripciones = [jugador, ...grupo.inscripciones];
                }
                return grupo;
            })

            return [...gruposNew]
        })
    }

    const obtenerPuntos = (duelos) => duelos.reduce((acc, d) => acc + (puntosMap[d.resultado] || 0), 0);

    const renderJugador = (jugador, operacion = "add") => {
        return <div key={jugador.id} className="player-row">
            <span>{jugador.Nombre}</span>
            <span>{grupos.find(({ id }) => id == jugador.idGrupo).Nombre}</span>
            <span>{obtenerPuntos(jugador.duelos)}</span>
            <button className={"btn " + (operacion === "add" ? "btn-primary" : "btn-danger")} type="button" onClick={operacion === "add" ? () => agregarJugador(jugador) : () => quitarJugador(jugador)}>{operacion === "add" ? "+" : "-"}</button>
        </div>
    }

    const jugadoresAOrdenar = grupoSelected
        ? grupoSelected.inscripciones
        : grupos.flatMap(g => g.inscripciones || []);

    const jugadoresOrdenados = jugadoresAOrdenar.sort((a, b) => {
        switch (orden) {
            case "puntos":
                return obtenerPuntos(b.duelos) - obtenerPuntos(a.duelos);
            case "Nombre":
                return a.Nombre.localeCompare(b.Nombre);
            case "grupo":
                return a.idGrupo - b.idGrupo;
            default:
                return 0;
        }
    });

    const crearFase = async (e) => {
        e.preventDefault();
        try {

            const response = await fetch(server + "/admin/grupos/crearFase", {
                method: "POST",
                headers: {
                    auth: localStorage.getItem("sesion"),
                    "Content-Type": "application/json"
                },

                body: JSON.stringify({ nuevaFase, idTorneo: torneo.id, faseActual: torneo.idFase })
            })

            const json = response.json();
            if (response.ok) {
                toast.success(json.mensaje);
                onSuccess();
            } else {
                toast.error(json.mensaje);

            }

        } catch (error) {
            toast.error("Error interno al intentar crear la Nueva Fase");
        }

    }

    return (
        <form style={{ padding: "20px" }} onSubmit={crearFase}>
            <div className="alert alert-primary d-flex gap-4 align-items-center" role="alert">
                <BsExclamationCircleFill />
                <div>
                    Las fases deben contar con al menos un grupo.<br></br>Se sugiere la nomenclatura "Grupo &lt;Letra&gt;"
                </div>
            </div>
            <FloatInput label="Nombre del nuevo grupo de fase" onChange={handleChange} name="Nombre" ></FloatInput>
            <br></br>
            <CampoGroup label="Inscripciones disponibles">
                <FloatSelect name="grupo" label="Filtrar por Grupo" onChange={(e) => setGrupoSelected(grupos.find(({ id }) => id == e.target.value))}>
                    <option value="-1">Todos</option>
                    {grupos.filter(({ idFase }) => idFase == torneo.idFase).map(({ id, Nombre }) => {
                        return <option value={id} key={id}>{Nombre}</option>
                    })}
                </FloatSelect>
                <br></br>
                <div style={{ maxHeight: "300px", overflow: "auto" }}>
                    <div className="player-header">
                        <span className={orden == "Nombre" && "active" || ""} onClick={() => setOrden("Nombre")}>Nombre</span>
                        <span className={orden == "grupo" && "active" || ""} onClick={() => setOrden("grupo")}>Grupo Anterior</span>
                        <span className={orden == "puntos" && "active" || ""} ref={ref} onClick={() => setOrden("puntos")}>Puntos</span>
                        <span style={{ width: "70px" }}></span>
                    </div>
                </div>
                <div style={{ maxHeight: "300px", overflow: "auto" }}>
                    {jugadoresOrdenados.map(j => renderJugador(j, "add"))}
                </div>
            </CampoGroup>
            <br></br>
            <CampoGroup label="Inscripciones Seleccionadas">
                <div style={{ maxHeight: "300px", overflow: "auto" }}>
                    {
                        nuevaFase.inscripciones.map((inscripcion) => {
                            return renderJugador(inscripcion, "quit")

                        })}
                </div>
            </CampoGroup>
            <button className="btn btn-primary">Crear</button>
            {showAsitant}
        </form>
    )
}
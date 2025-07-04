import { useContext, useEffect, useState } from "react";
import { LoginContext } from "../../contextos/loginContext";
import useDataManager from "../../hooks/useDataManager";
import convertirFecha from "../../funciones/convertirFecha";

export default function AdministrarDuelos() {
    const { server } = useContext(LoginContext)
    const [torneoSelected, setTorneoSelected] = useState(null);
    const [grupoSelected, setGrupoSelected] = useState(null);
    const [torneos, setTorneos] = useState([]);
    const [grupos, setGrupos] = useState([]);
    const [duelos, setDuelos] = useState([]);

    const {
        dataPaginada,
        mostrarConteo,
        next,
        prev,
        puedeAvanzar,
        puedeRetroceder,
    } = useDataManager({
        datos: duelos,
        elementosPorPagina: 10,
        filtro: ({ idGrupo }) => grupoSelected ? idGrupo == grupoSelected.id : true,
        sort: "fecha",
    });


    const cargarTorneosData = async () => {
        const response = await fetch(server + "/admin/torneos/cargarTorneos", {
            headers: {
                "Content-Type": "application/json",
                "auth": localStorage.getItem("sesion")
            }
        });

        const json = await response.json();
        setTorneos(json.torneos);
    }

    const cargarGrupos = async (idTorneo) => {
        if (idTorneo == "") return;
        const response = await fetch(server + "/admin/grupos/cargarGrupos", {
            headers: {
                "Content-Type": "application/json",
                "auth": localStorage.getItem("sesion")
            },
            method: "POST",
            body: JSON.stringify({
                idTorneo
            })
        });

        const json = await response.json();
        setGrupos(json.grupos);
    }

    const cargarDuelos = async (idTorneo) => {
        if (idTorneo == "") return;
        const response = await fetch(server + "/admin/duelos/cargarDuelosTorneo", {
            headers: {
                "Content-Type": "application/json",
                "auth": localStorage.getItem("sesion")
            },
            method: "POST",
            body: JSON.stringify({
                idTorneo
            })
        });

        const json = await response.json();
        setDuelos(json.duelos.map(duelo=>{
            duelo.fechaFormatted = duelo.fecha == '1900-01-01 00:00:00' ? "Sin definir" :convertirFecha(duelo.fecha);
            
            return duelo;
        }));
    }

    useEffect(() => {
        cargarTorneosData();
    }, [])

    return (
        <div>
            <h4>Administrar Duelos</h4><br></br>
            <div className="form-floating mb-3">
                <select className="form-select" id="torneoSelect" onChange={({ target: { value } }) => { cargarGrupos(value); cargarDuelos(value); setTorneoSelected(torneos.find(({ id }) => id == value)) }} aria-label="Selecciona una opción">
                    {
                        torneos.length === 0
                            ? <option disabled>Cargando torneos...</option>
                            : <>
                                <option value="">Seleccione un torneo</option>
                                {torneos.map(({ id, Nombre }) => (
                                    <option key={id} value={id}>{Nombre}</option>
                                ))}
                            </>
                    }
                </select>
                <label htmlFor="torneoSelect">Torneo</label>
            </div>
            <div className="form-floating mb-3">
                <select className="form-select" id="grupoSelect" aria-label="Selecciona una opción" onChange={({ target: { value } }) => { setGrupoSelected(grupos.find((({ id }) => id == value))) }}>
                    {torneoSelected ? grupos.length > 0 ?
                        <>
                            <option value="">Sin filtro</option>
                            {grupos.map(({ id, Nombre }) => <option value={id} key={id}>{Nombre}</option>)}
                        </>
                        : <option>No hay grupos disponibles en el torneo</option> : <option disabled>Seleccioná un torneo para cargar grupos</option>}
                </select>
                <label htmlFor="grupoSelect">Grupo</label>
            </div>
            <button className="btn btn-primary">Crear nuevo Duelo Manual</button><br /><br /> <button className="btn btn-primary"
                onClick={() => { }}>Crear Duelos Automáticos 1v1</button><br /><br />

            <div id="errores" className="alert alert-danger d-flex hide" role="alert">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
                    className="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                    <path
                        d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                </svg>

                <div>
                    <h4>Jugadores a los que no fue posible agregar al duelo</h4>
                    <div id="errores-data">

                    </div>
                </div>
            </div>
            <div style={{ width: "100%" }}>
                <span>Resultados en pantalla: <b>{mostrarConteo}</b></span><br></br>
                <button id="btn-prev" className="btn btn-primary" disabled={!puedeRetroceder} onClick={prev}>Anterior</button>
                <button id="btn-next" className="btn btn-primary " disabled={!puedeAvanzar} onClick={next}>Siguiente</button>
            </div>
            <table className="table table-stripped">
                <thead className="table-primary">
                    <tr>
                        <th>id</th>
                        <th>Fecha</th>
                        <th>Grupo</th>
                        <th>Jugadores</th>
                        <th>Seleccionar</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody id="results">
                    {dataPaginada && dataPaginada.map(duelo => {
                        return <tr key={duelo.id}>
                            <td>
                                {duelo.id}
                            </td>
                            <td>
                                {duelo.fechaFormatted}
                            </td>
                            <td>
                                {duelo.Grupo}
                            </td>
                            <td>
                                {duelo.players.length > 0 && <ul>
                                    {
                                        duelo.players.map(({ id, Nombre }) => {
                                            return <li key={id}>{Nombre}</li>
                                        })
                                    }
                                </ul>}
                            </td>
                            <td>
                                <button className="btn btn-primary">Seleccionar</button>
                            </td>
                            <td>
                                <button className="btn btn-danger">X</button>
                            </td>
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    )
}
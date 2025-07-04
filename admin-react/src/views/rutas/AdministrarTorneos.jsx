import { useEffect, useState, useContext } from "react";
import { LoginContext } from "../../contextos/loginContext";
import { toast } from "react-toastify";
import useDataManager from "../../hooks/useDataManager";

export default function AdministrarTorneos() {
    const { server } = useContext(LoginContext);
    const [torneos, setTorneos] = useState([]);
    const [cargando, setCargando] = useState(true);

    const convertirFecha = (fechaMysql) => {
        if (!fechaMysql) return "";
        const [fechaPart, horaPart] = fechaMysql.split(" ");
        const [anio, mes, dia] = fechaPart.split("-");
        return horaPart ? `${dia}-${mes}-${anio} ${horaPart}` : `${dia}-${mes}-${anio}`;
    };

    const cargarTorneos = async () => {
        try {
            const response = await fetch(server + "/admin/torneos/cargarTorneos", {
                headers: {
                    "Content-Type": "application/json",
                    auth: localStorage.getItem("sesion"),
                },
            });

            const json = await response.json();

            if (json.codigo !== 200) throw new Error("Error al cargar torneos");

            const torneosFormateados = (json.torneos || []).map((t) => ({
                ...t,
                pagoTxt: t.pago === 0 ? "No" : "Sí",
                fechaParsed: convertirFecha(t.fechaInicio),
            }));

            setTorneos(torneosFormateados);
        } catch (err) {
            console.error(err);
            toast.error("Error al cargar torneos");
        } finally {
            setCargando(false);
        }
    };

    const toggleTorneo = async (idTorneo) => {
        try {
            const response = await fetch(server + "/admin/torneos/activarTorneo", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    auth: localStorage.getItem("sesion"),
                },
                body: JSON.stringify({ idTorneo }),
            });

            const json = await response.json();

            if (json.codigo === 200) {
                setTorneos((prev) =>
                    prev.map((t) =>
                        t.id === idTorneo
                            ? { ...t, activo: t.activo === 1 ? 0 : 1 }
                            : t
                    )
                );
                toast.success("Estado cambiado con éxito");
            } else {
                toast.error("No se pudo cambiar el estado del torneo");
            }
        } catch (err) {
            console.error(err);
            toast.error("Error al activar/desactivar torneo");
        }
    };

    useEffect(() => {
        cargarTorneos();
    }, []);

    const {
        dataPaginada,
        mostrarConteo,
        next,
        prev,
        puedeAvanzar,
        puedeRetroceder,
    } = useDataManager({
        datos: torneos,
        elementosPorPagina: 10,
        sort: "Nombre"
    });

    if (cargando) return <div>Cargando torneos...</div>;

    return (
        <div>
            <h4>Administrar torneos</h4>
            <button className="btn btn-primary mb-3">Crear nuevo torneo</button>

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
                        <th>Elo Min</th>
                        <th>Elo Max</th>
                        <th>Pago</th>
                        <th>Fecha de Inicio</th>
                        <th>Img</th>
                        <th>Grupos</th>
                        <th>Acción</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {dataPaginada.map((t) => (
                        <tr key={t.id}>
                            <td>{t.id}</td>
                            <td>{t.Nombre}</td>
                            <td>{t.eloMin}</td>
                            <td>{t.eloMax}</td>
                            <td>{t.pagoTxt}</td>
                            <td>{t.fechaParsed}</td>
                            <td>{t.img}</td>
                            <td>{t.Grupos}</td>
                            <td>
                                <button className="btn btn-sm btn-primary me-1">
                                    Modificar
                                </button>
                            </td>
                            <td>
                                <button
                                    className={`btn btn-sm ${t.activo === 1 ? "btn-danger" : "btn-success"}`}
                                    onClick={() => toggleTorneo(t.id)}
                                >
                                    {t.activo === 1 ? "Desactivar" : "Activar"}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

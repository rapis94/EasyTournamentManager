import { useContext, useEffect, useState } from "react";
import { CampoGroup, FloatFileInput, FloatInput, FloatSelect, FloatTextarea } from "../../system/Campos";
import GetData from "../../../funciones/getData";
import { formatDateMySQL } from "../../../funciones/convertirFecha";
import GetImage from "../../../funciones/getImage";
import { LoginContext } from "../../../contextos/loginContext";
import { toast } from "react-toastify";

export default function CrearTorneo({callback= ()=>{}}) {
    const {server} = useContext(LoginContext);
    const [torneo, setTorneo] = useState({
        Nombre: "",
        descr: "",
        eloMin: 0,
        eloMax: 0,
        pago: false,
        fechaInicio: formatDateMySQL(new Date, true),
        img: null,
    });
    
    const guardar = async (e)=>{
        e.preventDefault();
        try{

        const response = await fetch(server+"/admin/torneos/crearTorneo", {
            method: "POST",
            headers: {
                auth: localStorage.getItem("sesion"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify(torneo)
        })
        
        const json = await response.json();
        if(json.codigo == 200){
            toast.success(json.mensaje);
            callback();
        }
        }catch(error){
            console.error(error);
            toast.error("Hubo un error al ingresar el torneo");
        }

    }

    return (
        <form className="basic-form" onSubmit={guardar}>
            <h4>Formulario:</h4>
            <FloatInput label="Nombre" name="Nombre" value={torneo.Nombre} onChange={(e) => GetData({ name: e.target.name, value: e.target.value, type: e.target.type, setter: setTorneo })}></FloatInput>
            <FloatTextarea label="Descripción del torneo" name="descr" value={torneo.descr} onChange={(e) => GetData({ name: e.target.name, value: e.target.value, type: e.target.type, setter: setTorneo })} />
            <FloatInput label="Elo Mínimo" type="number" name="eloMin" value={torneo.eloMin} onChange={(e) => GetData({ name: e.target.name, value: e.target.value, type: e.target.type, setter: setTorneo })} />
            <FloatInput label="Elo Máximo" type="number" name="eloMax" value={torneo.eloMax} onChange={(e) => GetData({ name: e.target.name, value: e.target.value, type: e.target.type, setter: setTorneo })} />
            <label className="form-control"><input type="checkbox" name="pago" value={torneo.pago} onChange={(e) => GetData({ name: e.target.name, checked: e.target.checked, type: e.target.type, setter: setTorneo })} /> ¿Es torneo de pago?</label>
            <FloatInput type="datetime-local" label="Fecha de inicio" name="fechaInicio" value={torneo.fechaInicio} onChange={(e) => GetData({ name: e.target.name, type: e.target.type, value: e.target.value, setter: setTorneo })} />
            <div style={{textAlign: "center"}}>
                <img src={torneo.img ? torneo.img : null} width={200} style={{ margin: "auto" }}></img>
            </div>
            <br></br>
            <FloatFileInput label="Imagen de torneo" name="img" onChange={(e) => GetImage({
                setter: setTorneo,
                files: e.target.files,
                name: e.target.name
            })} accept="image/*" />
            <br></br>
            <button className="btn btn-primary">Crear</button>
        </form>
    )
}
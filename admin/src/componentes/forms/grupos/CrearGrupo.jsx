import { useContext, useState } from "react";
import { CampoGroup, FloatFileInput, FloatInput, FloatSelect, FloatTextarea } from "../../system/Campos";
import GetData from "../../../funciones/getData";
import { LoginContext } from "../../../contextos/loginContext";
import { toast } from "react-toastify";

export default function CrearGrupo({torneo={}, onSuccess= ()=>{}}) {
    const {server} = useContext(LoginContext);
    const [grupo, setGrupo] = useState({
        Nombre: "",
     
    });
    
    const guardar = async (e)=>{
        e.preventDefault();
        try{

        const response = await fetch(server+"/admin/grupos/crearGrupo", {
            method: "POST",
            headers: {
                auth: localStorage.getItem("sesion"),
                "Content-Type": "application/json"
            },
            body: JSON.stringify({torneo, grupo})
        })
        
        const json = await response.json();
        if(json.codigo == 200){
            toast.success(json.mensaje);
            onSuccess();
        }
        }catch(error){
            console.error(error);
            toast.error("Hubo un error al ingresar el torneo");
        }

    }

    return (
        <form className="basic-form" onSubmit={guardar}>
            <h4>Formulario:</h4>
            <FloatInput label="Nombre" name="Nombre" value={grupo.Nombre} onChange={(e) => GetData({ name: e.target.name, value: e.target.value, type: e.target.type, setter: setGrupo })}></FloatInput>
            
            <br></br>
            <button className="btn btn-primary">Crear</button>
        </form>
    )
}
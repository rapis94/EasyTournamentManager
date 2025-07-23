import { useContext, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';
import { LoginContext } from "../contextos/loginContext";
function Login() {
    const [email, setEmail] = useState("");
    const [pass, setPass] = useState("");
    const {server} = useContext(LoginContext);
    const [attemps, setAttemps] = useState({
        mensaje: "",
        cantidad: 0
    });
    const navigator = useNavigate();

    const login = async (e) => {
        e.preventDefault();
        try {
            const data = {
                email,
                pass

            }
            const response = await fetch(server + "/public/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
            });

            const json = await response.json();

            if (json.codigo == 200) {
                
                toast.success("Sesión Iniciada con éxito!!!")
                localStorage.setItem("sesion", json.sesion.token);
                navigator("/front");
            } else {
                setAttemps(prev=>({
                    ...prev,
                    mensaje: json.mensaje,
                    cantidad: prev.cantidad+1
                }));
               
            }
        } catch (error) {
            console.log(error)
            toast.error("Hubo un error interno en el sistema, intenta nuevamente");
        }

    }
    
    return (
        <div className="bg-light d-flex align-items-center align-content-center row-gap-4 justify-content-center flex-wrap vh-100">
            <h2>Easy Championship Manager</h2>
            <div style={{ width: "100%" }}></div>
            <div className="card shadow p-4" style={{ maxWidth: "350px" }}>
                <h3 className="text-center mb-4">Iniciar Sesión</h3>
                <form onSubmit={login}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                            Correo electrónico / Usuario
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            placeholder="tucorreo@ejemplo.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="pass" className="form-label">
                            Contraseña
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="pass"
                            placeholder="••••••••"
                            value={pass}
                            onChange={(e) => setPass(e.target.value)}
                            required
                        />
                    </div>
                    {attemps.mensaje != "" && (
                        <div className="alert alert-danger" role="alert">
                            <span>Credenciales incorrectas</span>
                            <br />
                            <b>
                                Intentos fallidos: <i>{attemps.cantidad}</i>
                            </b>
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary w-100">
                        Ingresar
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Login;

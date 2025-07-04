import { createContext, useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";

export const LoginContext = createContext();
export default function LoginContextProvider({ children }) {
    const [loginType, setLoginType] = useState(0);
    const [server, setServer] = useState("https://demovanilla.ddns.net:456");
    const location = useLocation();
    const navigator = useNavigate();
    useEffect(() => {
        const tokenVerify = async () => {
            try {
                const tokenResponse = await fetch(server + "/admin/auth/tokenVerification", {
                    headers: {
                        "Content-Type": "application/json",
                        "auth": localStorage.getItem("sesion")
                    }
                });

                if (!tokenResponse.ok) {
                    throw new Error("Token inválido o expirado");
                }

                const tokenData = await tokenResponse.json();
                console.log("Token válido:", tokenData);
            } catch (err) {
                console.error("Error verificando el token:", err);
                localStorage.removeItem("token");
                navigator("/");
            }
        };
        if (location.pathname != "/") {
            tokenVerify();
        }
    }, [location.pathname]);

    return (
        <LoginContext.Provider value={{
            loginType, setLoginType,
            server, setServer
        }}>
            {children}
        </LoginContext.Provider>
    );
}

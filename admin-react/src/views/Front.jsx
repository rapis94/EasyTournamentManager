import Sidebar from "../componentes/system/sidebar";
import { Routes, Route } from "react-router-dom";
import Home from "./rutas/Home";
import AdministrarTorneos from "./rutas/AdministrarTorneos";
import AdministrarUsuarios from "./rutas/AdministrarUsuarios";
import AdministrarGrupos from "./rutas/AdministrarGrupos";
import AdministrarDuelos from "./rutas/administrarDuelos";
import BasicModal from "../componentes/system/modal";
import { useContext } from "react";
import { LoginContext } from "../contextos/loginContext";
import Asistant from "../componentes/system/Asistant";

export default function Front() {
    return (
        <>
            <Sidebar />

            <div className="bg-light border-bottom position-fixed w-100" style={{ zIndex: 1000, height: "60px", left: 0, top: 0 }}>
                <div className="d-flex justify-content-between align-items-center px-4" style={{ height: "100%" }}>
                    <h5 className="mb-0">Panel de Administración</h5>
                    <div>👤 <b id="user-name">Admin</b></div>
                </div>
            </div>

            <div className="content px-4" id="mainContext" style={{ paddingTop: "80px" }}>

                {
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/administrar-torneos" element={<AdministrarTorneos />} />
                        <Route path="/administrar-usuarios" element={<AdministrarUsuarios />} />
                        <Route path="/administrar-grupos" element={<AdministrarGrupos />} />
                        <Route path="/administrar-duelos" element={<AdministrarDuelos />} />

                    </Routes>
                }
            </div>
        </>
    );
}


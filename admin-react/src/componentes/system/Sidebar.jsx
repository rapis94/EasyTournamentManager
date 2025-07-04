
import {
  BsHouse,
  BsPeople,
  BsTrophy,
  BsBoxSeam,
  BsPlayFill,
  BsGear,
} from "react-icons/bs";
import { Link } from "react-router";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white position-fixed h-100 sidebar p-3" id="sidebar">
      <h4 className="text-center mb-4">Admin</h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/front"><BsHouse /> <span>Inicio</span></Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/front/administrar-usuarios"><BsPeople /> <span>Administrar Usuarios</span></Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/front/administrar-torneos"><BsTrophy /> <span>Administrar Torneos</span></Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/front/administrar-grupos"><BsBoxSeam /> <span>Administrar Grupos</span></Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/front/administrar-duelos"><BsBoxSeam /> <span>Administrar Duelos</span></Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/front"><BsPlayFill /> <span>Administrar Casteos</span></Link>
        </li>
        <li className="nav-item mb-2">
          <Link className="nav-link text-white" to="/front"><BsGear /> <span>Configuración</span></Link>
        </li>
      </ul>
    </div>
  );
}

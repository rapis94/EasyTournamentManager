
import {
  BsHouse,
  BsPeople,
  BsTrophy,
  BsBoxSeam,
  BsPlayFill,
  BsGear,
} from "react-icons/bs";

export default function Sidebar() {
  return (
    <div className="bg-dark text-white position-fixed h-100 sidebar p-3" id="sidebar">
      <h4 className="text-center mb-4">Admin</h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#"><BsHouse /> <span>Inicio</span></a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#"><BsPeople /> <span>Administrar Usuarios</span></a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#"><BsTrophy /> <span>Administrar Torneos</span></a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#"><BsBoxSeam /> <span>Administrar Grupos</span></a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#"><BsBoxSeam /> <span>Administrar Duelos</span></a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#"><BsPlayFill /> <span>Administrar Casteos</span></a>
        </li>
        <li className="nav-item mb-2">
          <a className="nav-link text-white" href="#"><BsGear /> <span>Configuración</span></a>
        </li>
      </ul>
    </div>
  );
}

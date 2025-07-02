<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Panel de Administración</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet" />
    <link href="css/main.css" rel="stylesheet" />
</head>

<body>

    <div class="bg-dark text-white position-fixed h-100 sidebar p-3" id="sidebar">
        <h4 class="text-center mb-4">Admin</h4>

        <ul class="nav flex-column">
            <li class="nav-item mb-2">
                <a class="nav-link text-white" onclick="navegar(event, 'inicio')"><i class="bi bi-house"></i>
                    <span>Inicio</span></a>
            </li>
            <li class="nav-item mb-2">
                <a class="nav-link text-white" onclick="navegar(event, 'administrarUsuarios')"><i
                        class="bi bi-people"></i>
                    <span>Administrar
                        Usuarios</span></a>
            </li>
            <li class="nav-item mb-2">
                <a class="nav-link text-white" onclick="navegar(event, 'administrarTorneos')"><i class="bi bi-trophy"></i></i> <span>Administrar
                        Torneos</span></a>
            </li>
            <li class="nav-item mb-2">
                <a class="nav-link text-white" onclick="navegar(event, 'administrarGrupos')">
                    <i class="bi bi-box-seam"></i>
                    <span>Administrar Grupos</span>
                </a>
            </li>
            <li class="nav-item mb-2">
                <a class="nav-link text-white" onclick="navegar(event, 'administrarDuelos')">
                    <i class="bi bi-box-seam"></i>
                    <span>Administrar Duelos</span>
                </a>
            </li>
            <li class="nav-item mb-2">
                <a class="nav-link text-white" href="#"><i class="bi bi-play"></i> <span>Administrar Casteos</span></a>
            </li>
            <li class="nav-item mb-2">
                <a class="nav-link text-white" href="#"><i class="bi bi-gear"></i> <span>Configuración</span></a>
            </li>
        </ul>
        <hr>
        <button class="btn btn-sm btn-secondary w-100" onclick="toggleSidebar()">⇄ <span
                id="contraer">Contraer</span></button>
    </div>

    <div class="bg-light border-bottom position-fixed w-100" style="z-index: 1000; height: 60px; left: 0; top: 0;">
        <div class="d-flex justify-content-between align-items-center px-4" style="height: 100%;">
            <h5 class="mb-0">Panel de Administración</h5>
            <div>👤 <b id="user-name"></b></div>
        </div>
    </div>

    <div class="content px-4" id="mainContext" style="padding-top: 80px;">


    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.js"></script>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <script>
        function toggleSidebar() {
            document.getElementById("sidebar").classList.toggle("collapsed");
            document.getElementById("mainContext").classList.toggle("collapsed");
            document.getElementById("contraer").classList.toggle("hide");
        }
    </script>
    <script src="js/loaders.js"></script>
    <script src="js/globalContext.js"></script>
    <script src="js/torneos.js"></script>
    <script src="js/usuarios.js"></script>
    <script src="js/grupos.js"></script>
    <script src="js/duelos.js"></script>

    <script src="js/renders.js"></script>

</body>

</html>
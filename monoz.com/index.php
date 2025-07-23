<?php
include_once "core.php";
include_once "php/Data.php";
?>
<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title>Monoz AoE</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Goudy+Bookletter+1911&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="/css/main.css?=14">
    <link rel="stylesheet" href="/css/forms.css?=14">
    <link rel="stylesheet" href="/css/web.css?=14">
    <link rel="stylesheet" href="/css/nav.css?=14">
</head>

<body style="">
    <script src="/js/loaders.js?=14"></script>
    <script src="/js/torneos.js?=14"></script>
    <script src="/js/globalContext.js?=14"></script>
    <script src="/js/users.js?=14"></script>
    <nav id="main-nav">
        <div style="height: 100%; align-content: center; padding: 10px">
            <span style="font-weight: bold; color: var(--fuente1)">Monoz AoE</span>
        </div>
        <div id="logo-flotante">
            <img src="/img/logo.png" style="height: 48px">
        </div>

        <div id="menu-container">
            <div class="hamburger" id="toggle-menu" onclick="mostrarMenu(this)">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div id="menu">
                <a class="link" href="/inicio">Inicio</a>
                <a class="link">Casteos</a>
                <a class="link" href="/torneos">Torneos</a>
                <a class="link" id="login" href="/login">Login</a>
                <a class="link">Contacto</a>
            </div>
        </div>
    </nav>
    <?php
    $navegador = new NAVEGADOR();
    if (isset($_GET['uri'])) {
        $navegador->navegar($_GET['uri']);
    } else {
        $navegador->navegar("inicio");
    }
    ?>
    <div id="popup" class="hide">
        <div id="popup-title">
            <h4 id="popup-title-content">Popup</h4><button class="btn-p btn-normal" onclick="cerrarPopup()">X</button>
        </div>
        <div id="popup-body">

        </div>
    </div>
    <div id="puerta-i">

    </div>
    <img id="logo-super">
    <div id="puerta-d">

    </div>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
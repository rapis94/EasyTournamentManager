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
    <title>Torneos Mario Ovalle</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400..900&family=Goudy+Bookletter+1911&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="/css/main.css?=7">
    <link rel="stylesheet" href="/css/forms.css?=7">
    <link rel="stylesheet" href="/css/web.css?=7">
</head>

<body>
    <script src="/js/loaders.js?=7"></script>
    <script src="/js/torneos.js?=7"></script>
    <script src="/js/globalContext.js?=7"></script>
    <script src="/js/users.js?=7"></script>
    <nav id="main-nav">
        <div style="display: flex">
            <div style="background-image: url(/img/pergamino.webp); background-size: contain">
            <img src="/img/logo.png" width="64"> <span style="color: var(--fuente2); font-weight: bold"> Mario Ovalle Oficial</span>
            </div>
            <img src="/img/pergamino-right.webp" height="64">
        </div>
        <div id="menu-container">
            <img src="/img/pergamino-left.webp" height="64">
            <div id="menu">
                <a class="link" id="toggle-menu" onclick="mostrarMenu(this)"><</a>
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
        <div id="popup-title"><h4 id="popup-title-content">Popup</h4><button class="btn-p btn-normal" onclick="cerrarPopup()">X</button></div>
        <div id="popup-body">

        </div>
    </div>
    
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>

</html>
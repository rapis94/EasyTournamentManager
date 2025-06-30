<?php

define("RUTA_BASE", dirname(realpath(__FILE__)) . "/");
define("RUTA_NAVEGADOR", "/");
define("secret", "queElAlientoDelDragonDeLosInjustosNoIncinereTuRectitud");

class NAVEGADOR
{

    private $vista;
    public $variables = [];

    function navegar($uri)
    {
        $ruta = "views/" . $uri . ".php";

        if (file_exists($ruta)) {
            include_once $ruta;
        } else {
            http_response_code(404);
            echo json_encode([
                "status" => "error",
                "message" => "Ruta no encontrada"
            ]);
        }
    }

    function descomponerLink($uri)
    {
        return explode("/", $uri);
    }

}

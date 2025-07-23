<?php
try {

    $result = execQuery("
    INSERT INTO torneo (Nombre, descr, eloMin, eloMax, pago, fechaInicio, img, activo, idFase)
    VALUES (?,?,?,?,?,?, '', 1, -1)
    ", [$_POST["Nombre"], $_POST["descr"], $_POST["eloMin"], $_POST["eloMax"], intval($_POST["pago"]), $_POST["fechaInicio"]]);

    if ($result) {
        if (isset($_POST["img"])) {
            $nombre = $result . generate_string("abcdefghijklmnopqrstuvwxyz") . ".webp";
            $directorio = "./fotos/torneos";
            $imgBase64 = preg_replace('#^data:image/\w+;base64,#i', '', $_POST["img"]);
            $imgBinaria = base64_decode($imgBase64);
            if ($imgBinaria === false) {
                echo json_encode(["codigo" => 500, "mensaje" => "No fue cargar la imagen del torneo"]);
                exit;
            }
            file_put_contents($directorio . "/" . $nombre, $imgBinaria);
            execQuery("UPDATE torneo SET  img='$nombre' WHERE id=$result");
            execQuery("INSERT INTO grupo_torneo VALUES (NULL, 'Sin Grupo', $result, -1)");
        }
        echo json_encode(["codigo" => 200, "mensaje" => "Torneo ingresado con éxito"]);

    } else {
        http_response_code(500);
        echo json_encode(["codigo" => 500, "mensaje" => "Se cagó todo papi"]);
    }

} catch (Exception $e) {
    http_response_code(500);
    $logFile = 'errores';

    $error = "[" . date('Y-m-d H:i:s') . "] " . PHP_EOL;
    $error .= "Mensaje: " . $e->getMessage() . PHP_EOL;
    $error .= "Archivo: " . $e->getFile() . PHP_EOL;
    $error .= "Línea: " . $e->getLine() . PHP_EOL;
    $error .= "Trace: " . $e->getTraceAsString() . PHP_EOL;
    $error .= str_repeat("-", 80) . PHP_EOL;

    file_put_contents($logFile, $error, FILE_APPEND);
    echo json_encode(["codigo" => 500, "mensaje" => "Se cagó todo papi"]);

}
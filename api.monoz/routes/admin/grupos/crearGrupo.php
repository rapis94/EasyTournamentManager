<?php
try {

    $result = execQuery("INSERT INTO grupo_torneo VALUES (NULL, ?, ?, ?)", [$_POST["grupo"]["Nombre"], $_POST["torneo"]["id"], $_POST["torneo"]["idFase"]]);

    if ($result) {
        echo json_encode(["codigo" => 200, "mensaje" => "Grupo creado con éxito"]);
    } else {
        http_response_code(500);
        echo json_encode(["codigo" => 500, "mensaje" => "Hubo un error al crear el grupo"]);
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
    echo json_encode(["codigo" => 500, "mensaje" => "Hubo un error al crear el grupo"]);

}
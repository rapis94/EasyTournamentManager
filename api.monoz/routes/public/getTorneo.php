<?php
try {
    $torneo = execQuery("SELECT * FROM torneo WHERE id=?", [$_POST['idTorneo']]);
    if ($torneo) {
        $torneo = $torneo[0];
        echo json_encode(["codigo" => 200, "torneo" => $torneo]);
    } else {
        echo json_encode(["codigo" => 500, "mensaje" => "Error al cargar la informacion del torneo. Intenta nuevamente"]);

    }

} catch (Exception $e) {
    $logFile = 'errores';

    $error = "[" . date('Y-m-d H:i:s') . "] " . PHP_EOL;
    $error .= "Mensaje: " . $e->getMessage() . PHP_EOL;
    $error .= "Archivo: " . $e->getFile() . PHP_EOL;
    $error .= "Línea: " . $e->getLine() . PHP_EOL;
    $error .= "Trace: " . $e->getTraceAsString() . PHP_EOL;
    $error .= str_repeat("-", 80) . PHP_EOL;

    file_put_contents($logFile, $error, FILE_APPEND);
    echo json_encode(["codigo" => 401, "mensaje" => "Hubo un problema al cargar la información del torneo. Intenta nuevamente"]);

}

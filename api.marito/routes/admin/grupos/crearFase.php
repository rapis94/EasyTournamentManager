<?php
try {
    $queries = [];
    $nuevaFase = [...$_POST["nuevaFase"], "idFase" => intval($_POST["faseActual"]) + 1];
    $idGrupo = execQuery("INSERT INTO grupo_torneo (idTorneo, Nombre, idFase) VALUES (?,?,?)", [$_POST["idTorneo"], $nuevaFase["Nombre"], $nuevaFase["idFase"]]);

    if ($idGrupo) {
        $transact = [];
        foreach ($nuevaFase["inscripciones"] as $inscripcion) {
            $transact[] = [
                "query" => "INSERT INTO inscripciones (idUsuario, idGrupo, fecha, revisada) VALUES (?, ?, ?, ?) ",
                "params" => [$inscripcion["idUsuario"], $idGrupo, date("Y-m-d H:i:s"), 1]
            ];
        }
        $transact[] = [
            "query" => "UPDATE torneo SET idFase=? WHERE id=?",
            "params" => [$nuevaFase["idFase"], $_POST["idTorneo"]]
        ];

        if (execTransaction($transact)) {
            echo json_encode(["codigo" => 200, "mensaje" => "Fase creada con éxito"]);
        }
    } else {
        http_response_code(500);
        echo json_encode(["codigo" => 500, "mensaje" => "Hubo un error al crear la fase"]);
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
    echo json_encode(["codigo" => 500, "mensaje" => "Hubo un error al crear la fase"]);

}

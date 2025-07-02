<?php
function crearAutoDuelo1v1(array $inscripciones, string $fecha, int $grupo)
{
    $cantidad = count($inscripciones);
    $errores = [];
    for ($i = 0; $i < $cantidad - 1; $i++) {
        for ($j = $i + 1; $j < $cantidad; $j++) {
            $jugadorA = $inscripciones[$i];
            $jugadorB = $inscripciones[$j];

            $checkQuery = "
                SELECT dj1.idDuelo
                FROM duelo_jugador dj1
                JOIN duelo_jugador dj2 ON dj1.idDuelo = dj2.idDuelo
                WHERE (
                    (dj1.idInscripcion = ? AND dj2.idInscripcion = ?) OR
                    (dj1.idInscripcion = ? AND dj2.idInscripcion = ?)
                )
                GROUP BY dj1.idDuelo
                HAVING COUNT(*) = 2
            ";

            $dueloExistente = execQuery($checkQuery, [$jugadorA, $jugadorB, $jugadorB, $jugadorA]);

            if ($dueloExistente) {
                continue;
            }

            $insertDuelo = "INSERT INTO duelo (fecha, idGrupo) VALUES (?, ?)";
            $idDuelo = execQuery($insertDuelo, [$fecha, $grupo]);

            $insertJugador = "INSERT INTO duelo_jugador (idDuelo, idInscripcion, equipo, ganador) VALUES (?, ?, ?, ?)";
            $result = execQuery($insertJugador, [$idDuelo, $jugadorA["id"], 1, 0]);
            $resultB = execQuery($insertJugador, [$idDuelo, $jugadorB["id"], 2, 0]);
            if (!$result) {
                $errores[] = $jugadorA["id"];
            }
            if (!$resultB) {
                $errores[] = $jugadorB["id"];
            }
        }
    }

    return $errores;
}
try {
    $result = crearAutoDuelo1v1($_POST["inscripciones"], "1900-01-01 00:00:00", $_POST["idGrupo"]);

    if (count($result) > 0) {
        echo json_encode(["codigo" => "201", "mensaje" => "Hubo error en el ingreso de algunos duelos", "errores" => $result]);
    } else {
        echo json_encode(["codigo" => "200", "mensaje" => "Duelos creados con éxito", "errores" => $result]);

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
    echo json_encode(["codigo" => "500", "mensaje" => "Hubo un error interno"]);

}
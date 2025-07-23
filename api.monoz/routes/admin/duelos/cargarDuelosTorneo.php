<?php
try {
    $result = execQuery("SELECT duelo.id, duelo.fecha, grupo_torneo.Nombre as Grupo, idGrupo FROM duelo, grupo_torneo WHERE grupo_torneo.id = idGrupo and idTorneo = ? ORDER By grupo_torneo.id, duelo.id", [$_POST["idTorneo"]]);
    $resultPlayers = execQuery("SELECT inscripciones.id, usuario.Nombre, idDuelo FROM duelo, duelo_jugador, grupo_torneo, inscripciones, usuario WHERE duelo_jugador.idDuelo = duelo.id and idInscripcion = inscripciones.id and usuario.id = idUsuario and grupo_torneo.id = duelo.idGrupo and idTorneo = ? ORDER By grupo_torneo.id, duelo.id", [$_POST["idTorneo"]]);
    foreach ($result as $duelo) {
        $duelo->players = [];
        foreach ($resultPlayers as $player) {
            if ($player->idDuelo == $duelo->id) {
                $duelo->players[] = clone $player;
            }
        }
    }
    echo json_encode(["codigo" => 200, "duelos" => $result ?: []]);
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



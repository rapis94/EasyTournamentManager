<?php
try {

    $result = execQuery("SELECT usuario.id, usuario.Nombre, usuario.elo, duelo.fecha, duelo_jugador.ganador FROM usuario, duelo, duelo_jugador WHERE usuario.id = duelo_jugador.idJugador and idDuelo = duelo.id and idGrupo = ? ", [$_POST["idGrupo"]]);
    
    echo json_encode(["codigo"=>200, "duelos"=>$result ?: []]);
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



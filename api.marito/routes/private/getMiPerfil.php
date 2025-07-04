<?php

$result = execQuery("
    SELECT comprobante, revisada, grupo_torneo.Nombre as Grupo, torneo.Nombre as Torneo, idTorneo 
    FROM torneo, grupo_torneo, inscripciones 
    WHERE idGrupo = grupo_torneo.id AND idTorneo = torneo.id AND idUsuario = {$usuario->id}
");

$duelos = execQuery("
    SELECT duelo.id, duelo.fecha, resultado, idTorneo 
    FROM grupo_torneo, duelo, inscripciones, duelo_jugador 
    WHERE grupo_torneo.id = duelo.idGrupo 
      AND duelo.id = idDuelo 
      AND idInscripcion = inscripciones.id 
      AND inscripciones.idUsuario = ?
", [$usuario->id]);

$idsDuelo = array_column($duelos, 'id');

$otrosJugadores = [];
if (count($idsDuelo) > 0) {
    $placeholders = implode(',', array_fill(0, count($idsDuelo), '?'));

    $otrosJugadores = execQuery("
        SELECT duelo_jugador.idDuelo, inscripciones.idUsuario, inscripciones.id as idInscripcion, usuario.Nombre
        FROM duelo_jugador 
        JOIN inscripciones ON inscripciones.id = duelo_jugador.idInscripcion JOIN usuario ON idUsuario = usuario.id
        WHERE duelo_jugador.idDuelo IN ($placeholders)
    ", $idsDuelo);
}

$jugadoresPorDuelo = [];
foreach ($otrosJugadores as $jugador) {
    $jugadoresPorDuelo[$jugador->idDuelo][] = $jugador;
}

foreach ($result as $torneo) {
    $torneo->duelos = [];

    foreach ($duelos as $duelo) {
        if ($duelo->idTorneo == $torneo->idTorneo) {
            $duelo->jugadores = $jugadoresPorDuelo[$duelo->id] ?? [];
            $torneo->duelos[] = $duelo;
        }
    }
}

echo json_encode(["usuario" => $usuario, "torneos" => $result]);

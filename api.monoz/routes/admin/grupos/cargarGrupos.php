<?php

if (!isset($_POST["idTorneo"])) {
    echo json_encode(["codigo" => 400, "mensaje" => "Falta idTorneo"]);
    exit;
}
$join = "";
if (!isset($_POST["getAll"])) {
    $join = "JOIN torneo ON torneo.id = grupo_torneo.idTorneo AND (grupo_torneo.idFase = torneo.idFase OR grupo_torneo.idFase = -1)";

}

$idTorneo = $_POST["idTorneo"];

$grupos = execQuery(
    "SELECT grupo_torneo.* 
                            FROM grupo_torneo
                            $join
                            WHERE grupo_torneo.idTorneo = ? ",
    [$idTorneo]
);

$grupoIds = array_column($grupos, 'id');
if (count($grupoIds)) {
    $placeholders = implode(',', array_fill(0, count($grupoIds), '?'));
    $params = $grupoIds;

    $inscripciones = execQuery("
        SELECT inscripciones.*, usuario.Nombre, usuario.elo 
        FROM inscripciones
        JOIN usuario ON usuario.id = inscripciones.idUsuario
        WHERE inscripciones.idGrupo IN ($placeholders)
    ", $params);
}

$duelos = execQuery("
    SELECT duelo_jugador.*, duelo.idGrupo, duelo.fecha 
    FROM duelo_jugador
    JOIN duelo ON duelo_jugador.idDuelo = duelo.id
    WHERE duelo.idGrupo IN (
        SELECT id FROM grupo_torneo WHERE idTorneo = ?
    )
", [$idTorneo]);

$inscripcionesPorGrupo = [];
if ($inscripciones) {

    foreach ($inscripciones as $insc) {
        $inscripcionesPorGrupo[$insc->idGrupo][] = $insc;
    }
}

$duelosPorInscripcion = [];
if ($duelos) {

    foreach ($duelos as $duelo) {
        $duelosPorInscripcion[$duelo->idInscripcion][] = $duelo;
    }
}

foreach ($grupos as $grupo) {
    $grupo->inscripciones = [];

    foreach ($inscripcionesPorGrupo[$grupo->id] ?? [] as $inscripcion) {
        $inscripcion->duelos = $duelosPorInscripcion[$inscripcion->id] ?? [];
        $grupo->inscripciones[] = $inscripcion;
    }
}

echo json_encode([
    "codigo" => 200,
    "grupos" => $grupos
]);

<?php
$result = execQuery("SELECT grupo_torneo.* FROM grupo_torneo WHERE idTorneo=?", [$_POST["idTorneo"]]);
$inscripciones = execQuery("SELECT inscripciones.*, usuario.Nombre, usuario.elo FROM inscripciones, grupo_torneo, usuario WHERE usuario.id = idUsuario and grupo_torneo.id = idGrupo and idTorneo =?", [$_POST["idTorneo"]]);

if ($result) {
    foreach ($result as $grupo) {
        $grupo->inscripciones = [];
        foreach ($inscripciones as $inscripcion) {
            if ($grupo->id == $inscripcion->idGrupo) {
                $grupo->inscripciones[] = clone $inscripcion;
            }
        }
    }
}


echo json_encode(["codigo" => 200, "grupos" => $result ?: []]);
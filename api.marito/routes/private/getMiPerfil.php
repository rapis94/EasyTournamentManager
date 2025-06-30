<?php 

$result = execQuery("SELECT comprobante, revisada, grupo_torneo.Nombre as Grupo, torneo.Nombre as Torneo, idTorneo from torneo, grupo_torneo, inscripciones WHERE idGrupo = grupo_torneo.id and idTorneo = torneo.id and idUsuario={$usuario->id}");


echo json_encode(["usuario"=>$usuario, "torneos"=>$result]);
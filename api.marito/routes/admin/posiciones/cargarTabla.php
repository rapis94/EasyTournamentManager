<?php

$resultGrupo = execQuery("SELECT usuario.id, usuario.Nombre FROM grupo_torneo, usuario, inscripciones WHERE grupo_torneo.id = idGrupo and idUsuario = usuario.id and idTorneo = ?", [$_POST["idTorneo"]]);

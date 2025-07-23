<?php
$result = execQuery("SELECT torneo.*, count(grupo_torneo.id) as Grupos FROM torneo LEFT JOIN grupo_torneo ON torneo.id = idTorneo Group By torneo.id ORDER By torneo.id Desc");

if ($result) {
    echo json_encode(["codigo"=>200, "torneos"=>$result]);
}else{
    echo json_encode(["codigo"=> 500,"torneos"=> []]);
}
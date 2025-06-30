<?php
$result = execQuery("SELECT * FROM torneo ORDER By id Desc");

if ($result) {
    echo json_encode(["codigo"=>200, "torneos"=>$result]);
}else{
    echo json_encode(["codigo"=> 500,"torneos"=> []]);
}
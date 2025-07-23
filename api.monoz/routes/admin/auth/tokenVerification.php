<?php
if($usuario->tipoUsuario == 1){
    echo json_encode(["codigo"=>200,"mensaje"=>"Acceso autorizado", "data"=>$usuario]);
}else{
    http_response_code(401);
    echo json_encode(["codigo"=>401,"mensaje"=>"Acceso no autorizado"]);

}

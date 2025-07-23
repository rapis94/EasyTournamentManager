<?php
try {
    $hash = hash_password($_POST['pass']);


    $result = execQuery("SELECT * FROM usuario WHERE id=? and password=?", [$usuario->id, $hash]);

    if ($result) {
        $hashNew = hash_password($_POST["passN1"]);
        $update = execQuery("UPDATE usuario SET password = ? WHERE id=?", [$hashNew, $usuario->id]);
        echo json_encode(["codigo" => 200, "Mensaje" => "Contraseña cambiada con éxito"]);

    } else {
        echo json_encode(["codigo" => 401, "Mensaje" => "La contraseña no es correcta"]);
    }
} catch (Exception $ee) {
    var_dump($ee);
}

<?php
try {

    $pass = hash_password($_POST["pass"]);
    $result = execQuery("SELECT id, Nombre, email, discord, elo, tipoUsuario, activo, profPic, steam FROM usuario WHERE (email=? OR Nombre=?) and (password=? || password='')", [$_POST["email"], $_POST["email"], $pass]);
    if ($result) {
        if ($result[0]->activo == 0) {
            http_response_code(401);
            echo json_encode(["codigo" => 401, "mensaje" => "El usuario no está habilitado"]);
            exit();
        }

        $jwt = generarJWT($result[0], secret);

        echo json_encode(["codigo" => 200, "mensaje" => "Sesión correcta", "sesion" => ["token" => $jwt, "usuario" => $result[0]]]);

    } else {
        http_response_code(401);

        echo json_encode(["codigo" => 401, "mensaje" => "Error en usuario y/o contraseña"]);

    }
} catch (Exception $e) {
    $logFile = 'errores';

    $error = "[" . date('Y-m-d H:i:s') . "] " . PHP_EOL;
    $error .= "Mensaje: " . $e->getMessage() . PHP_EOL;
    $error .= "Archivo: " . $e->getFile() . PHP_EOL;
    $error .= "Línea: " . $e->getLine() . PHP_EOL;
    $error .= "Trace: " . $e->getTraceAsString() . PHP_EOL;
    $error .= str_repeat("-", 80) . PHP_EOL;

    file_put_contents($logFile, $error, FILE_APPEND);
    http_response_code(500);

    echo json_encode(["codigo" => 500, "mensaje" => "Hubo un error al abrir la sesión"]);
}


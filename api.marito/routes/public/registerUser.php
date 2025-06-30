<?php
try {
    $userExist = execQuery("SELECT * FROM usuario WHERE Nombre = '{$_POST["discord"]}'");
    if ($userExist) {
        echo json_encode(["codigo" => "501", "mensaje" => "Ya existe un usuario registrado con este Nick de Discord"]);
        exit();
    }

    $userExist = execQuery("SELECT * FROM usuario WHERE email = '{$_POST["email"]}'");
    if ($userExist) {
        echo json_encode(["codigo" => "502", "mensaje" => "Ya existe un usuario registrado con este E-Mail"]);
        exit();
    }

    $userExist = execQuery("SELECT * FROM usuario WHERE steam = '{$_POST["steam"]}'");
    if ($userExist) {
        echo json_encode(["codigo" => "503", "mensaje" => "Ya existe un usuario registrado con este link de Steam"]);
        exit();
    }
    $pass = generate_string("ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789");

    $hash = hash_password($pass);
    $result = execQuery("INSERT INTO usuario VALUES (NULL, ?, ?, ?, ?, 0, '$hash', 3, 1, '')", [trim($_POST["nick"]), trim($_POST["email"]), trim($_POST["discord"]), $_POST["steam"]]);

    if ($result) {
        $to = $_POST["email"];
        $subject = "Bienvenido a la nueva plataforma de torneos de Mario Ovalle. Instrucciones de como seguir";
        $message = file_get_contents("mailTemplates/newUser.html");
        $message =str_replace("{Nombre}", $_POST["discord"],$message);
        $message =str_replace("{password}", $pass,$message);
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

        $headers .= 'From: noreply-marito@vanillasoftworks.com' . "\r\n";
        mail($to, $subject, $message, $headers);
        echo json_encode(["codigo" => "200", "mensaje" => "Gracias por tu registro parcerito!. Espera a recibir el E-Mail de confirmación para poder definir tu contraseña."]);
    } else {
        echo json_encode(["codigo" => "500", "mensaje" => "Hubo un error interno al intentar registrarte, por favor, comunícate al mail ***@***.*** para informar el problema"]);
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
    echo json_encode(["codigo" => "500", "mensaje" => "Hubo un error interno al intentar registrarte, por favor, comunícate al mail ***@***.*** para informar el problema"]);

}




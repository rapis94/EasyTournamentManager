<?php
try {
    $result = execQuery("UPDATE inscripciones SET idGrupo = ? WHERE id = ?", [$_POST["idGrupo"], $_POST["idPlayer"]]);

    if ($result) {
        $data = execQuery("SELECT usuario.*, torneo.Nombre as Torneo, grupo_torneo.Nombre as Grupo FROM inscripciones, usuario, torneo, grupo_torneo WHERE inscripciones.idGrupo = grupo_torneo.id and idTorneo = torneo.id and idUsuario = usuario.id and inscripciones.id=?", [$_POST["idPlayer"]]);
        $data = $data[0];
        $to = $data->email;
        $subject = "Hola parcero! Tienes un nuevo grupo asignado en el torneo \"{$data->Torneo}\"!!!!";
        $message = file_get_contents("mailTemplates/cambiarGrupo.html");
        $message = str_replace("{Nombre}", $data->Nombre, $message);
        $message = str_replace("{torneo}", $data->Torneo, $message);
        $message = str_replace("{grupo}", $data->Grupo, $message);
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

        $headers .= 'From: noreply-marito@vanillasoftworks.com' . "\r\n";

        mail($to, $subject, $message, $headers);
        echo json_encode(["codigo" => 200, "mensaje" => "Grupo cambiado con éxito"]);
    } else {
        http_response_code(500);
        echo json_encode(["codigo" => 500, "mensaje" => "Error al cambiar el grupo"]);
    }
} catch (Exception $e) {
    http_response_code(500);
    $logFile = 'errores';

    $error = "[" . date('Y-m-d H:i:s') . "] " . PHP_EOL;
    $error .= "Mensaje: " . $e->getMessage() . PHP_EOL;
    $error .= "Archivo: " . $e->getFile() . PHP_EOL;
    $error .= "Línea: " . $e->getLine() . PHP_EOL;
    $error .= "Trace: " . $e->getTraceAsString() . PHP_EOL;
    $error .= str_repeat("-", 80) . PHP_EOL;

    file_put_contents($logFile, $error, FILE_APPEND);
    echo json_encode(["codigo" => "500", "mensaje" => "Hubo un error interno"]);

}



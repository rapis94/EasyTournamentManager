<?php
$result = execQuery("SELECT * FROM usuario WHERE id=?", [$_POST["idUsuario"]]);

if ($result) {
    $result = $result[0];
    execQuery("UPDATE usuario SET activo=IF(activo=1, 0, 1) WHERE id=?", [$result->id]);
    if ($result->activo == 0) {

        $to = $result->email;
        $subject = "Hola parcero! Tu cuenta en la plataforma Web ya fue activada!!!!";
        $message = file_get_contents("mailTemplates/activeUser.html");
        $message = str_replace("{Nombre}", $result->Nombre, $message);
        $headers = "MIME-Version: 1.0" . "\r\n";
        $headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

        $headers .= 'From: noreply-marito@vanillasoftworks.com' . "\r\n";

        mail($to, $subject, $message, $headers);
    }

    echo json_encode(["codigo" => "200", "mensaje" => "Estado cambiado con éxito"]);
} else {
    echo json_encode(["codigo" => "500", "mensaje" => "No fue posible efectuar el cambio"]);
}
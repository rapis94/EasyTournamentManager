<?php
$torneo = execQuery("SELECT * FROM torneo WHERE id=?", [$_POST['idTorneo']]);
try {

    if ($torneo) {
        $torneo = $torneo[0];
        if ($torneo->eloMax >= $usuario->elo && $torneo->eloMin <= $usuario->elo) {
            $inscripcion = execQuery('SELECT * FROM inscripciones, grupo_torneo, torneo WHERE idTorneo = torneo.id and grupo_torneo.id = idGrupo and idUsuario = ?', [$usuario->id]);

            if ($inscripcion) {
                echo json_encode(["codigo" => 401, "mensaje" => "Ya estas inscripto en este torneo!"]);
            } else {
                $grupo = execQuery("SELECT * FROM grupo_torneo WHERE idTorneo = ?", [$_POST["idTorneo"]])[0];
                $result = execQuery("INSERT INTO inscripciones VALUES (NULL, ?, ?, NOW(), '', 0)", [$usuario->id, $grupo->id]);
                if ($result) {
                    if (isset($_POST["comprobante"])) {
                        try {
                            $directorio = "./fotos/comprobantes/";
                            $nombre = $grupo->id . "-" . $usuario->id . "-" . $result . generate_string("abcdefghijklmnopqrstuvwxyz") .".". $_POST["comprobante"]["extension"];
                            $fotoBase64 = preg_replace('#^data:image/\w+;base64,#i', '', $_POST["comprobante"]["base64"]);
                            $fotoBinaria = base64_decode($fotoBase64);
                            if ($fotoBinaria === false) {
                                echo json_encode(["codigo" => 500, "mensaje" => "No fue posible cargar la foto ingresar del comprobante"]);
                                exit();
                            }
                            file_put_contents($directorio . $nombre, $fotoBinaria);
                            execQuery("UPDATE inscripciones SET comprobante='$nombre' WHERE id=$result");
                        } catch (Exception $e) {
                            echo json_encode(["codigo" => 500, "mensaje" => "No fue posible cargar la foto ingresar del comprobante"]);
                            exit();
                        }

                    }
                    echo json_encode(["codigo" => 200, "data" => $torneo, "mensaje" => "Inscripción exitosa! Muchas gracias por participar. Podras ver el estado de tu inscripción en la sección \"Mi perfil\""]);
                } else {
                    echo json_encode(["codigo" => 401, "mensaje" => "Hubo un problema al generar la inscripción al torneo. Intenta nuevamente"]);
                }
            }
        } else {
            echo json_encode(["codigo" => 401, "mensaje" => "Tu elo no se encuentra en el rango requerido para el torneo"]);
        }

    } else {
        echo json_encode(["codigo" => 401, "mensaje" => "Hubo un problema al cargar la información del torneo. Intenta nuevamente"]);

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
    echo json_encode(["codigo" => 401, "mensaje" => "Hubo un problema al cargar la información del torneo. Intenta nuevamente"]);

}

<?php
define("secret", "SecretForJWT");
define("SALT", 'saltForPasswords');

function Config()
{

    $datos = [
        0 => "server",
        1 => "user",
        2 => "pass",
        3 => "BD"
    ];
    return $datos;
}

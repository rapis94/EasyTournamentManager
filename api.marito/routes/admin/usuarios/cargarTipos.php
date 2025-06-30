<?php
$tipos = SELECT("*", "tipo_usuario");

echo json_encode($tipos);
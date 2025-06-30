<?php
$data = json_decode(file_get_contents("php://input"));
include_once "../../php/Data.php";

?>
<form onsubmit="inscribirme(event, this)">
    <input type="hidden" id="idTorneo" value="<?= $data->id ?>">
    <h4>Te estas inscribiendo en <?= $data->Nombre ?></h4>
    <img width="200" src="<?= SERVER_API . "/fotos/" . ($data->img != "" ? $data->img : "logo.png") ?>">
    <br>
    <span><b>Elo Mínimo permitido: </b> <?= $data->eloMin ?></span><br>
    <span><b>Elo Máximo permitido: </b> <?= $data->eloMax ?></span><br>
    <br>
    <?php
    if ($data->pago == 1) {
        ?>
        <span><b>Este torneo tiene costo inscrpción</b></span><br>
        <br>
        <div class="form-control-custom">
            <label>Adjunta tu comprobante de pago</label>
            <input required type="file" id="comprobante">
        </div>
        <?php
    }
    ?>
    <div style="text-align: right">
        <button class="btn btn-normal">Completar inscripción</button>
    </div>
</form>
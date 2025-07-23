<?php
$ch = curl_init(SERVER_API . "/public/getTorneos");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);

$response = curl_exec($ch);
$data = json_decode($response);
curl_close($ch);

?>

<div class="torneos">

    <?php 
        if(count($data->torneos) > 0){
            foreach($data->torneos as $torneo){
                $date = date_create_from_format("Y-m-d",$torneo->fechaInicio);
                ?>
                <div class="torneo">
                    <img class="profile" src="<?=SERVER_API."/fotos/torneos/". ($torneo->img != "" ? $torneo->img :  "../logo.png")?>">
                    <div class="body">
                        <h4><?= $torneo->Nombre ?></h4>
                        <p><?= $torneo->descr ?></p>
                        <span><b>Fecha de inicio:</b> <?= $date->format("d/m/Y") ?></span>
                        <br>
                        <span><b>Tipo de inscripción</b> <?= $torneo->pago == 1 ? "Inscripción de pago" : "Inscripción gratuita" ?></span>
                        <div style="text-align: right">
                            <button class="btn btn-normal" onclick="getTorneo(<?= $torneo->id ?>)">Inscribirme</button>
                        </div>
                    </div>
                </div>
                <?php
            }
        }else{
            ?> 
            <h4>No hay torneos disponibles actualmente</h4>
            <?php
        }
    ?>
</div>
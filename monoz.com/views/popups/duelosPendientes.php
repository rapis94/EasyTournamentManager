<?php
$data = json_decode(file_get_contents("php://input"));
include_once "../../php/Data.php";
?>

<div>
    <h4>Duelos en el torneo</h4>
    <button class="btn btn-success" onclick="renderDuelos(()=>true, this)">Todos</button><button class="btn"  onclick="renderDuelos((duelo)=>duelo.resultado == 0, this)">Solo pendientes</button><button onclick="renderDuelos((duelo)=>duelo.resultado != 0, this)" class="btn">Solo disputados</button>
    <table class="table table-dark">
        <thead>
            <tr>
                <th>
                    Fecha
                </th>
                <th>
                    Contrincante
                </th>
                <th>
                    Resultado
                </th>
            </tr>

        </thead>
        <tbody id="tabla-resultados">
            
        </tbody>

    </table>
</div>

<script>
</script>
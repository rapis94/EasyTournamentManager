<h4>Administrar Grupos</h4><br>
<div class="form-floating mb-3">
  <select class="form-select" id="torneoSelect" aria-label="Selecciona una opción">
    <option selected disabled>Cargando torneos</option>
  </select>
  <label for="torneoSelect">Torneo</label>
</div>
<button class="btn btn-primary">Crear nuevo Grupo</button><br><br>
<?php
    include_once "grupos/verJugadoresGrupo.php";
?>

<div style="width: 100%;">
    <span>Resultados en pantalla: <b id="dataCountView"></b></span><br>
    <button id="btn-prev" class="btn btn-primary" onclick="anterior()">Anterior</button>
    <button id="btn-next" class="btn btn-primary" onclick="siguiente()">Siguiente</button>
</div>
<table class="table table-stripped">
    <thead class="table-primary">
        <tr>
            <th>id</th>
            <th>Nombre</th>
            <th>Jugadores</th>
            <th>Seleccionar</th>
        </tr>
    </thead>
    <tbody id="results">

    </tbody>
</table>

<h4>Administrar Grupos</h4><br>
<div class="form-floating mb-3">
  <select class="form-select" id="torneoSelect" aria-label="Selecciona una opción">
    <option selected disabled>Cargando torneos</option>
  </select>
  <label for="torneoSelect">Torneo</label>
</div>
<div class="form-floating mb-3">
  <select class="form-select" id="grupoSelect" aria-label="Selecciona una opción">
    <option selected disabled>Seleccioná un torneo para cargar grupos</option>
  </select>
  <label for="grupoSelect">Grupo</label>
</div>
<button class="btn btn-primary">Crear nuevo Duelo Manual</button><br><br> <button class="btn btn-primary"
  onclick="crearDuelos1v1()">Crear Duelos Automáticos 1v1</button><br><br>
<?php
include_once "duelos/verJugadoresGrupo.php";
include_once "duelos/verJugadoresDuelo.php";
?>
<div id="errores" class="alert alert-danger d-flex hide" role="alert">
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"
    class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
    <path
      d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
  </svg>

  <div>
    <h4>Jugadores a los que no fue posible agregar al duelo</h4>
    <div id="errores-data">

    </div>
  </div>
</div>
<div style="width: 100%;">
  <span>Resultados en pantalla: <b id="dataCountView"></b></span><br>
  <button id="btn-prev" class="btn btn-primary" onclick="anterior()">Anterior</button>
  <button id="btn-next" class="btn btn-primary" onclick="siguiente()">Siguiente</button>
</div>
<table class="table table-stripped">
  <thead class="table-primary">
    <tr>
      <th>id</th>
      <th>Fecha</th>
      <th>Grupo</th>
      <th>Jugadores</th>
      <th>Seleccionar</th>
      <th>Eliminar</th>
    </tr>
  </thead>
  <tbody id="results">
    <tr>
      <td>Sin datos</td>
    </tr>
  </tbody>
</table>
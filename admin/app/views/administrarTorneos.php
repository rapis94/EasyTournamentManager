<h4>Administrar torneos</h4><br>
<button class="btn btn-primary">Crear nuevo torneo</button><br><br>
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
            <th>Elo Min</th>
            <th>Elo Max</th>
            <th>Pago</th>
            <th>Fecha de Inicio</th>
            <th>Img</th>
            <th>Grupos</th>
            <th>Accion</th>
            <th>Estado</th>
        </tr>
    </thead>
    <tbody id="results">

    </tbody>
</table>

<h4>Administrar usuarios</h4><br>
<button class="btn btn-primary">Crear nuevo usuario</button><br><br>
<div style="width: 100%;">
    <span>Resultados en pantalla: <b id="dataCountView"></b></span><br>
    <button id="btn-prev" class="btn btn-primary" onclick="anterior()">Anterior</button>
    <button id="btn-next" class="btn btn-primary" onclick="siguiente()">Siguiente</button>
</div>
<table class="table table-stripped">
    <thead class="table-primary">
        <tr>
            <th>id</th>
            <th>Avatar</th>
            <th>Nick AOE</th>
            <th>E-Mail</th>
            <th>Discord</th>
            <th>Link Steam</th>
            <th>Elo</th>
            <th>Tipo</th>
            <th>Estado</th>
        </tr>
    </thead>
    <tbody id="results">

    </tbody>
</table>
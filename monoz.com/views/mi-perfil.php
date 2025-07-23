<div class="profile">
    <h1 style="border-bottom: solid; border-bottom-color: var(--fuente2); width: 100%; color: var(--fuente2)">Mi Perfil
    </h1>
</div>
<div class="profile">

    <div class="profilePic">
        <img src="" id="player-profPic" width="200px">
    </div>
    <div class="profileData">
        <div class="playerInfo">
            <span id="player-nombre"><b>Nombre: </b></span><br>
            <span id="player-elo"><b>Elo: </b></span><br>
            <span id="player-discord"><b>Discord: </b></span><br>
            <span id="player-steam"><b>Steam: </b> <a href="" id="steam-link" target="_blank">Link al
                    Perfil</a></span><br>
            <span id="player-email"><b>E-Mail: </b></span><br>
            <button class="btn btn-normal"
                onclick="document.getElementById('form-pass').classList.toggle('d-none')">Cambiar contraseña</button>
            <form class="d-none" id="form-pass" onsubmit="cambiarPass(event, this)">
                <label>Contraseña actual<br>
                    <input type="password" id="pass">
                </label><br>
                <label>Contraseña nueva<br>
                    <input type="password" id="passN1">
                </label><br>
                <label>Repetir contraseña nueva<br>
                    <input type="password" id="passN2">
                </label>
                <button class="btn btn-normal">Aceptar</button>
            </form>
        </div>
        <br>
        <div class="profileData">
            <h4>Torneos del Jugador:</h4>
            <div id="torneos">

            </div>
        </div>
    </div>

</div>
<script>
    getMiPerfil();
</script>
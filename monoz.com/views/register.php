<header id="portada">
    <img src="/img/logo.png" style="margin-top: 10px">
</header>
<form class="form" onsubmit="enviarRegistro(event, this)">
    <h2>Bienvenido Monozoide!</h2>
    <p>
        La nueva plataforma de torneos, te permitirá particiar de todos los torneos realizados por mi. Completa el
        formulario para retgistrarte.
    </p>
    <p>
        <b>¿Ya estas registrado?</b> <a href="/login">Inicia sesión aquí</a>
        <br>
        <br>
    </p>
    <div class="form-control-custom">
        <label for="email">E-Mail <b>*</b></label>
        <input id="email" type="email" required>
    </div>
    <div class="form-control-custom">
        <label for="nick">Nick en el juego <b>*</b></label>
        <input id="nick" type="text" required>
    </div>
    <div class="form-control-custom">
        <label for="discord">Nick o usuario de discord <b>*</b></label>
        <input id="discord" type="text" required>
    </div>

    <div class="form-control-custom">
        <label for="steam" style="width: 100%; display: flex; justify-content: space-between">
            <b>Link de AoE Insights *</b>
          
        </label>
        <div id="donde" class="hidden">
            <img src="/img/donde1.jpg" width="320">
            <img src="/img/donde2.jpg" width="320">
        </div>
        <input id="steam" type="text" required>
    </div>
    <div class="form-control-custom">
        <button class="btn btn-normal" id="btn-register" style="width: 100%">Registrarme!</button>
    </div>
</form>
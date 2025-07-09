const api = "https://demovanilla.ddns.net:456";
const nullDate = "1900-01-01 00:00:00";
function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

function mostrarMenu(element){
    const container=document.getElementById('menu-container');
    if(container.classList.contains("active")){
        element.innerHTML = "<";
    }else{
        element.innerHTML = ">";
    }
    container.classList.toggle('active');
    
}

document.addEventListener("DOMContentLoaded", ()=>{
    const sesion = JSON.parse(localStorage.getItem("sesion"));
    if(sesion?.token){
        const loginBtn = document.getElementById("login");
        loginBtn.innerHTML = "Mi Perfil";
        loginBtn.href= "/mi-perfil";
    }

});



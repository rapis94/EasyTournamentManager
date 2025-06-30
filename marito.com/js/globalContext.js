function cerrarPopup(){
    const popup = document.getElementById("popup");
    popup.classList.add("hide");
}

async function cargarPopup(view, title="Popup", vars=[]){
    const response = await fetch("/views/popups/"+view+".php", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(vars)
    })
    const html = await response.text();
    const popup = document.getElementById("popup");
    const popupT = document.getElementById("popup-title-content");
    const popupB = document.getElementById("popup-body");
    popup.classList.remove("hide");
    popupT.innerHTML = title;
    popupB.innerHTML = html;
    
}

function toBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            const base64 = reader.result;
            const extension = file.name.split('.').pop().toLowerCase();
            resolve({ base64, extension });
        };
        reader.onerror = error => reject(error);
    });
}

function showHideItem(item){
    item.classList.toggle("hidden");
}
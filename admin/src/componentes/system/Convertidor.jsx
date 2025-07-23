
export default function ConvertirAWebpBase64(file) {


    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);

        reader.onload = (event) => {
            const img = new Image();
            img.src = event.target.result;

            img.onload = () => {
                const canvas = document.createElement("canvas");
                canvas.width = 300;
                canvas.height = 300;

                const ctx = canvas.getContext("2d");
                ctx.drawImage(img, 0, 0, 300, 300);

                // Exporta a WebP con calidad 0.8 (ajustable)
                const base64Webp = canvas.toDataURL("image/webp", 0.8);
                resolve(base64Webp);
            };

            img.onerror = (error) => reject(error);
        };

        reader.onerror = (error) => reject(error);
    });
};
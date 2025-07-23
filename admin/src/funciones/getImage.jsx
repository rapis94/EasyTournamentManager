import ConvertirAWebpBase64 from "../componentes/system/convertidor";

export default async function GetImage({setter, files, name}) {
    console.log(setter, files, name);
    if (files && files[0]) {
        const file = files[0];
        const base64 = await ConvertirAWebpBase64(file);
        setter(prev => ({ ...prev, [name]: base64 }))
    }
}
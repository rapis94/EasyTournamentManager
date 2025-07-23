export default function GetData({ setter, name, value, type = "text", checked }) {
    const types = {
        number: () => Number(value),
        checkbox: () => checked ?? false,
        date: () => value,
        text: () => value,
        textarea: () => value
    };
    
    setter(prev => ({
        ...prev,
        [name]: types[type]()
    }));
};  
import { useEffect, useRef, useState } from "react";
import { BsCursorFill } from "react-icons/bs";

export default function Asistant({ x, y, duration = 1, callback=()=>{}, stateEnd=()=>{} }) {
    const ref = useRef();
    const [pos, setPos] = useState({ top: 0, left: 0 });
    const [durationLocal, setDurationLocal] = useState(duration);
    const [click, setClick] = useState(false);
    useEffect(() => {
        const update = () => {
            if (ref.current) {
                const rect = ref.current.getBoundingClientRect();
                setPos({ top: rect.top, left: rect.left });
            }
        };
        update();
        window.addEventListener("scroll", update);
        window.addEventListener("resize", update);
        setPos({
            top: x, left: y
        })



        const timeout = setTimeout(() => {
            setClick(true);
            setDurationLocal(prev=>prev/3);
        }, duration * 1000);

        const timeoutAction = setTimeout(callback, duration*1000);

        const timeout2 = setTimeout(() => {
           setClick(false);
        }, duration * 1000 + 500);

        const timeout3 = setTimeout(() => {
            setPos(prev => ({
                ...prev,
                left: 0
            }))
            setDurationLocal(prev => prev / 3);
        }, duration * 1000 + 1000);

        const timeout4 = setTimeout(() => {
            stateEnd(null)
        }, duration * 1000 + 1500);

        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
            clearTimeout(timeout);
            clearTimeout(timeout2);
            clearTimeout(timeout3);
            clearTimeout(timeout4);
            clearTimeout(timeoutAction);
        };
    }, []);

    useEffect(() => { console.log(pos) }, [pos]);
    return <div ref={ref} id="asistant" style={{ left: pos.left + "px", filter: click && "invert(100%)", top: pos.top + "px", transition: `all ease-in ${durationLocal}s` }}>
        <BsCursorFill />
    </div>
}
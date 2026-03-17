import { useEffect, useState, useRef } from "react"
import useFindStore from "../../../../stores/useFindStore"
const CounterNight = () => {
    const [date, setDates] = useState({
        days: [4, 7],
    })
    const [arraydays, setarraydays] = useState([])
    const [hidden, setHidden] = useState(true)
    const [render, setRender] = useState(false);
    const modalRef = useRef(null)
    const { nights, setNight } = useFindStore()
    useEffect(() => {
        setDates({ days: Array.isArray(nights) ? nights : [4, 7] })
    }, [nights])
    useEffect(() => {

        const daysArray = Array.from({ length: 30 }, (_, i) => i + 1); // 0..28 => 1..29
        setarraydays(daysArray);
    }, [])
    useEffect(() => {
        const handleClick = (e) => {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeWithAnimation()
            }
        }
        document.addEventListener('mousedown', handleClick)
        return () => document.removeEventListener('mousedown', handleClick)
    }, [])

    const setNightOnClick = (num) => {
    setDates(prev => {
        const [start, end] = prev.days;

        if (start !== null && end !== null) {
            return { days: [num, null] };
        }

        if (end === null) {
            let newRange;

            if (num < start) {
                newRange = [num, start];
            } else {
                newRange = [start, num];
            }

            setNight(newRange);

            return { days: newRange };
        }

        return prev;
    });
};
    const closeWithAnimation = () => {
        setHidden(true);
        setTimeout(() => setRender(false), 300);
    };
    const open = () => {
        setRender(true);
        setHidden(false);
    };
    return (
        <main className="w-full flex flex-col relative items-center">

            <div className={`absolute bottom-full mt-2 left-13/24 -translate-x-1/2 w-80 rounded-2xl bg-white shadow px-6 py-6 z-10 transition-all duration-300 ease-out
 ${hidden ? "opacity-0 translate-y-4 pointer-events-none" : "opacity-100 translate-y-0"
                }`} ref={modalRef}>
                <div className="grid grid-cols-6 gap-3">
                    {arraydays.map((i) => (
                        <div
                            key={i}
                            className={`cursor-pointer hover:bg-[#98b5d1] transition rounded text-white text-center py-2
${(date.days ?? []).includes(i)
                                    ? "bg-[#4d81b3]"
                                    : i > date.days[0] && i < date.days[1]
                                        ? "bg-[#8da8c2]"
                                        : "bg-[#aacae7]"
                                }`}
                            onClick={() => setNightOnClick(i)}
                        >
                            {i}
                        </div>
                    ))}
                </div>
            </div>

            <p
                className="w-full rounded-2xl border border-gray-300 text-center py-2 cursor-pointer bg-white hover:bg-blue-50 transition-colors duration-300 shadow-sm hover:shadow-md"
                onClick={() => {
                    if(render) closeWithAnimation();
                    else open()
                }}
            >
                {
                    date.days[0] && date.days[1]
                        ? `${date.days[0]} - ${date.days[1]}`
                        : "number of nights"
                }

            </p>


        </main>

    )
}

export default CounterNight

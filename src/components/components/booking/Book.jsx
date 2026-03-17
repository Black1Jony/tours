    import { useState, useEffect } from "react"
    import api from "../../../api/api"
    import useIdStore from "../../../stores/useIdStore"
    import { Select, message } from "antd"

    const Book = ({  idTour = 0, price = 0, guests = 0 }) => {
        const [messageApi, contextHolder] = message.useMessage()
        const { id } = useIdStore()
        const [loading, setLoading] = useState(false)
        const [waitEvent, setWaitEvent] = useState(false)

        const [dataToBooking, setDataToBooking] = useState({
            name: '',
            chosenApp: '',
            contact: '',
            idTour: idTour || id,
            guests: guests,
            price: price
        })
         useEffect(() => {
        setDataToBooking(prev => ({
            ...prev,
            guests: guests,
            price: price,
            idTour: idTour || id,
        }))
    }, [guests, price, idTour])
        const showMessage = (type, text) => messageApi.open({ type, content: text })

        const updateField = (field) => (e) =>
            setDataToBooking((prev) => ({ ...prev, [field]: e.target ? e.target.value : e }))

        const createBooking = async () => {
            if (waitEvent) {
                showMessage('warning', 'Please wait 5 minutes before booking again')
                return
            }

            if (!dataToBooking.chosenApp || !dataToBooking.contact || !dataToBooking.name) {
                showMessage('warning', 'Please fill in all fields')
                return
            }

            try {
                setLoading(true)
                const response = await api.post('/books', dataToBooking)

                if (typeof response.data === 'string') {
                    localStorage.setItem('secretKey', response.data)
                }

                console.log('data', response);
                
                showMessage('success', 'We will contact you soon')
                setWaitEvent(true)
                setTimeout(() => setWaitEvent(false), 5  * 1000)
            } catch (error) {
                console.error(error)
                showMessage('error', 'An error occurred')
            } finally {
                setLoading(false)
            }
        }

        return (
            <>
                {contextHolder}
                <main className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6">
                    <div className="space-y-2">
                        <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent font-inter">
                            Book a Tour
                        </h1>
                        <p className="text-slate-500 text-sm sm:text-base font-inter">
                            Fill out the booking form
                        </p>
                    </div>

                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                                Your Name
                            </label>
                            <input
                                type="text"
                                placeholder="Enter your name"
                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors bg-slate-50 text-slate-900 placeholder-slate-400 font-inter"
                                onChange={updateField('name')}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                                Choose Contact Method
                            </label>
                            <Select
                                className="w-full"
                                placeholder="Choose contact method"
                                options={[
                                    { value: "number", label: "Phone" },
                                    { value: "tg", label: "Telegram" },
                                    { value: "whatsapp", label: "WhatsApp" },
                                ]}
                                onChange={updateField('chosenApp')}
                                style={{ width: '100%' }}
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 font-inter">
                                Your Contact
                            </label>
                            <input
                                type="text"
                                placeholder="Email or phone"
                                className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-blue-500 focus:outline-none transition-colors bg-slate-50 text-slate-900 placeholder-slate-400 font-inter"
                                onChange={updateField('contact')}
                            />
                        </div>
                    </div>

                    <button
                        disabled={loading}
                        className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg font-inter text-lg disabled:opacity-60 disabled:cursor-not-allowed"
                        onClick={createBooking}
                    >
                        {loading ? 'Sending...' : 'Book Now'}
                    </button>

                    <p className="text-xs text-slate-500 text-center font-inter">
                        We will contact you within 24 hours
                    </p>
                </main>
            </>
        )
    }

    export default Book
import { useState } from "react"
import api from "../../../api/api"
import useIdStore from "../../../stores/useIdStore"
import { Select, message } from "antd"
const Book = ({isTourComponent=false, idTour=0, price=0, guests=0}) => {
        const [messageApi, contextHolder] = message.useMessage();

    const {id, setId, resetId} = useIdStore()
    const [dataToBooking, setDataToboking] = useState({
            name: '',
            chosenApp: '',
            contact: '',
            idTour: id,
            guests:guests,
            price:price
        })
        const [waitEvent, setWaitEvent] = useState(false)
    const showMessageValidation = (type, text) => {
        messageApi.open(
            {
                type,
                content: text,
            }
        )
    }
    const createBooking = async () => {
        try {
            if(waitEvent){
                showMessageValidation('warning', 'You have already filled the form, come back in 5 minutes')
            }
            if (dataToBooking.chosenApp && dataToBooking.contact && dataToBooking.name) {
               const responce = await api.post('/books', dataToBooking)
               console.log(responce.data);
               
               if(responce.data?.secretKey){
                localStorage.setItem('secretKey', responce.data?.secretKey)
               }
                if(!waitEvent)showMessageValidation('success', 'We will contact you soon')
                setWaitEvent(true)
                setTimeout(()=>{
                    setWaitEvent(false)
                }, 300)
            } else {
                showMessageValidation('warning', 'Please fill in all fields')
            }
        } catch (error) {
            console.log(error);
            showMessageValidation('error', 'An error occurred')
        }
    }
   
  return <>
  {contextHolder}
   <main className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6 sm:p-8 space-y-6 ">
                <div className="space-y-2">
                    <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent font-inte r">
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
                            onChange={(e) => setDataToboking({ ...dataToBooking, name: e.target.value })}
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
                                { value: "whatsap", label: "WhatsApp" },

                            ]}
                            onChange={(value) =>
                                setDataToboking({ ...dataToBooking, chosenApp: value })
                            }
                            style={{
                                width: '100%'
                            }}
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
                            onChange={(e) => setDataToboking({ ...dataToBooking, contact: e.target.value })}
                        />
                    </div>
                </div>

                <button
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 rounded-lg transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg font-inter text-lg"
                    onClick={createBooking}
                >
                    Book Now
                </button>

                <p className="text-xs text-slate-500 text-center font-inter">
                    We will contact you within 24 hours
                </p>
            </main>
  </>
}

export default Book
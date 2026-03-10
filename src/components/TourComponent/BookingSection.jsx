import { FaUsers, FaCheck, FaClock } from "react-icons/fa"
import { useState } from "react"
import Book from "../components/booking/Book"
const BookingSection = ({ data }) => {
    const [selectedGuests, setSelectedGuests] = useState(1)

    const basePrice = data?.price?.amount || 0
    const discount = data?.price?.discount || 0
    const discountedPrice = Math.round(basePrice * (1 - discount / 100))
    const totalPrice = discountedPrice * selectedGuests

    return (
        <div className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2 text-white">
                        <h2 className="text-3xl font-bold mb-8">Забронируйте ваш тур</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                            {/* Количество гостей */}
                            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">

                                <FaUsers size={20} />
                                Количество гостей

                                <div className="flex justify-around gap-3 mt-3">
                                    <div className="bg-gray-300 w-8 h-8 rounded-[50%] text-center flex items-center justify-center cursor-pointer hover:bg-gray-400 transition-colors transition-200ms  "
                                        onClick={() => setSelectedGuests(prev => prev < 10 ? prev + 1 : prev + 0)}
                                    >+</div>
                                    <div>{selectedGuests < 10? selectedGuests: "10+"}</div>
                                    <div className="bg-gray-300 w-8 h-8 rounded-[50%] text-center flex items-center justify-center cursor-pointer hover:bg-gray-400 transition-colors transition-200ms"
                                        onClick={() => setSelectedGuests(prev => prev > 1 ? prev - 1 : prev + 0)}

                                    >-</div>

                                </div>
                            </div>

                            {/* Доступные места */}
                            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                                <label className="flex items-center gap-2 text-white font-semibold mb-4">
                                    <FaCheck size={20} />
                                    Доступные места
                                </label>
                                <div className="w-full bg-white/20 rounded-full h-3">
                                    <div
                                        className="bg-white h-3 rounded-full transition-all"
                                        style={{
                                            width: `${((data?.booking?.availableSeats || 0) / (data?.booking?.totalSeats || 1)) * 100}%`,
                                        }}
                                    ></div>
                                </div>
                                <p className="text-white/80 text-sm mt-2">
                                    {data?.booking?.availableSeats} из {data?.booking?.totalSeats} мест
                                </p>
                            </div>

                            {/* Доступно до */}
                            <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                                <label className="flex items-center gap-2 text-white font-semibold mb-4">
                                    <FaClock size={20} />
                                    Доступно до
                                </label>
                                <p className="text-white text-lg font-bold">{data?.booking?.availableUntil}</p>
                                <p className="text-white/80 text-sm">Торопитесь!</p>
                            </div>
                        </div>

                        {/* Ограничения по возрасту */}
                        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                            <h3 className="font-semibold mb-4">Ограничения</h3>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                <div>
                                    <p className="text-white/70 text-sm">Минимальный возраст</p>
                                    <p className="text-white font-bold text-lg">{data?.booking?.minAge}+</p>
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm">Максимальный возраст</p>
                                    <p className="text-white font-bold text-lg">{data?.booking?.maxAge || "∞"}</p>
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm">Дети разрешены</p>
                                    <p className="text-white font-bold text-lg">{data?.audience?.kidsAllowed ? "✓ Да" : "✗ Нет"}</p>
                                </div>
                                <div>
                                    <p className="text-white/70 text-sm">Питомцы разрешены</p>
                                    <p className="text-white font-bold text-lg">{data?.audience?.petsAllowed ? "✓ Да" : "✗ Нет"}</p>
                                </div>
                            </div>
                        </div>

                        {/* Расчет цены */}
                        <div className="bg-white/10 p-6 rounded-lg backdrop-blur-sm">
                            <h3 className="font-semibold mb-4">Расчет цены</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                                <div className="bg-white/5 p-4 rounded">
                                    <p className="text-white/70 text-sm mb-2">Цена за человека</p>
                                    <p className="text-white font-bold text-2xl">
                                        {discountedPrice.toLocaleString()} <span className="text-lg">{data?.price?.currency}</span>
                                    </p>
                                    {discount > 0 && (
                                        <p className="text-green-400 text-sm mt-2">Скидка -{discount}%</p>
                                    )}
                                </div>
                                <div className="bg-white/5 p-4 rounded">
                                    <p className="text-white/70 text-sm mb-2">Общая сумма ({selectedGuests} {selectedGuests === 1 ? 'человек' : 'человека'})</p>
                                    <p className="text-white font-bold text-2xl">
                                        {totalPrice.toLocaleString()} <span className="text-lg">{data?.price?.currency}</span>
                                    </p>
                                </div>
                            </div>

                            {/* Таблица цен для разного количества людей */}
                            <div className="mt-6">
                                <p className="text-white/70 text-sm mb-3">Цены для разного количества людей:</p>
                                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((guests) => (
                                        <div
                                            key={guests}
                                            onClick={() => setSelectedGuests(guests)}
                                            className={`p-3 rounded text-center cursor-pointer transition-all ${
                                                selectedGuests === guests
                                                    ? 'bg-white text-blue-600 font-bold'
                                                    : 'bg-white/10 text-white hover:bg-white/20'
                                            }`}
                                        >
                                            <p className="text-xs opacity-70">{guests} чч.</p>
                                            <p className="font-bold">{(discountedPrice * guests).toLocaleString()}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <Book isTourComponent={true} />
                </div>
            </div>
        </div>
    )
}

export default BookingSection

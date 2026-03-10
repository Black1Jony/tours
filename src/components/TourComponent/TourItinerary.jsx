import { FaCalendarAlt } from "react-icons/fa"

const TourItinerary = ({ data }) => {
    return (
        <div className="w-full bg-white py-16 px-4">
            <div className="max-w-7xl mx-auto">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">Маршрут тура</h2>
                <div className="h-1 w-24 bg-blue-500 rounded mb-12"></div>

                <div className="space-y-6">
                    {data?.days?.map((day, idx) => (
                        <div key={idx} className="border-l-4 border-blue-500 pl-8 py-4 hover:bg-gray-50 rounded-r-lg transition">
                            <div className="flex items-start gap-4">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-500 text-white font-bold text-lg">
                                        {day.dayNumber}
                                    </div>
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-xl font-bold text-gray-800 mb-2">{day.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{day.description}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Сводка по дням */}
                <div className="mt-16 p-8 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <div className="flex items-center gap-3 mb-4">
                        <FaCalendarAlt className="text-blue-600" size={24} />
                        <h3 className="text-2xl font-bold text-gray-800">Сводка тура</h3>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
                        <div className="text-center">
                            <p className="text-gray-600 text-sm mb-2">Всего дней</p>
                            <p className="text-3xl font-bold text-blue-600">{data?.duration?.days}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-600 text-sm mb-2">Ночей</p>
                            <p className="text-3xl font-bold text-blue-600">{data?.duration?.nights}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-600 text-sm mb-2">Доступные места</p>
                            <p className="text-3xl font-bold text-green-600">{data?.booking?.availableSeats}</p>
                        </div>
                        <div className="text-center">
                            <p className="text-gray-600 text-sm mb-2">Всего мест</p>
                            <p className="text-3xl font-bold text-gray-600">{data?.booking?.totalSeats}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default TourItinerary

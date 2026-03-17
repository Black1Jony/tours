import { FaWifi, FaSwimmingPool, FaSpa, FaUtensils, FaPlane, FaHotel, FaShieldAlt, FaMapMarkerAlt } from "react-icons/fa"
import { IoCheckmark } from "react-icons/io5"
import { useRef, useEffect } from "react";

const TourInfo = ({ data }) => {
const mapContainer = useRef(null);
    useEffect(() => {
    let mapInstance;
    const loadMap = async () => {
      if (!mapContainer.current || !data?.geo?.coordinates) return;
      const coordinate = data.geo.coordinates;
      const { default: maplibregl } = await import("maplibre-gl");
      await import("maplibre-gl/dist/maplibre-gl.css");

      mapInstance = new maplibregl.Map({
        container: mapContainer.current,
        style: "https://tiles.openfreemap.org/styles/bright",
        center: [coordinate[0], coordinate[1]],
        zoom: 12,
      });

      new maplibregl.Marker({ color: "#FF0000" })
        .setLngLat([coordinate[0], coordinate[1]])
        .addTo(mapInstance);
    };

    loadMap();

    return () => {
      if (mapInstance) {
        mapInstance.remove();
      }
    };
  }, []);

    const extras = [
        { icon: FaSwimmingPool, label: "Бассейн", key: "pool" },
        { icon: FaWifi, label: "WiFi", key: "wifi" },
        { icon: FaSpa, label: "SPA центр", key: "spa" },
        { icon: FaUtensils, label: "Все включено", key: "meals" },
    ]

    const included = [
        { label: "Авиаперелёты", value: data?.included?.flight, icon: FaPlane },
        { label: "Проживание в отеле", value: data?.included?.hotel, icon: FaHotel },
        { label: "Трансферы", value: data?.included?.transfer, icon: FaPlane },
        { label: "Страховка", value: data?.included?.insurance, icon: FaShieldAlt },
        { label: "Виза", value: data?.included?.visa, icon: FaMapMarkerAlt },
        { label: "Гид", value: data?.included?.guide, icon: FaMapMarkerAlt },
    ]

    return (
        <div className="w-full bg-gray-50 py-16 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Информация об отеле */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Размещение</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold text-gray-800 mb-4">{data?.hotel?.name}</h3>
                            <div className="flex items-center gap-2 mb-4">
                                <div className="flex gap-1">
                                    {Array.from({ length: data?.hotel?.stars }).map((_, i) => (
                                        <span key={i} className="text-yellow-400 text-xl">★</span>
                                    ))}
                                </div>
                                <span className="text-gray-600">({data?.hotel?.stars} звёзд)</span>
                            </div>
                            <p className="text-gray-700 leading-relaxed">{data?.hotel?.description}</p>
                        </div>

                        <div className="bg-white p-8 rounded-lg shadow-md">
                            <h3 className="text-xl font-bold text-gray-800 mb-6">Удобства отеля</h3>
                            <div className="grid grid-cols-2 gap-4">
                                {extras.map((extra, idx) => (
                                    <div key={idx} className="flex items-center gap-3">
                                        <extra.icon className="text-blue-500" size={24} />
                                        <span className="text-gray-700">{extra.label}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="min-h-48 mt-8 p-4 bg-blue-50 rounded-lg" ref={mapContainer}>
                                
                            </div>
                        </div>
                    </div>
                </section>

                {/* Что включено */}
                <section className="mb-16">
                    <h2 className="text-3xl font-bold text-gray-800 mb-8">Что входит в тур</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {included.map((item, idx) => (
                            <div key={idx} className={`p-6 rounded-lg flex items-center gap-4 ${item.value ? 'bg-green-50 border-2 border-green-300' : 'bg-gray-100 border-2 border-gray-300'}`}>
                                <item.icon size={32} className={item.value ? 'text-green-600' : 'text-gray-400'} />
                                <div>
                                    <span className={`font-semibold ${item.value ? 'text-green-700' : 'text-gray-500'}`}>{item.label}</span>
                                    <p className="text-xs text-gray-500">{item.value ? '✓ Включено' : '✗ Не включено'}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* Рейс и документы */}
                <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Информация о рейсе</h3>
                        <div className="space-y-4">
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-600">Из:</span>
                                <span className="font-semibold text-gray-800">{data?.flight?.from}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-600">В:</span>
                                <span className="font-semibold text-gray-800">{data?.flight?.to}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-600">Авиакомпания:</span>
                                <span className="font-semibold text-gray-800">{data?.flight?.airline}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-600">Прямой рейс:</span>
                                <span className="font-semibold text-green-600">{data?.flight?.direct ? 'Да' : 'Нет'}</span>
                            </div>
                            <div className="flex justify-between border-b pb-3">
                                <span className="text-gray-600">Багаж:</span>
                                <span className="font-semibold text-gray-800">{data?.flight?.baggage}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-600">Трансфер:</span>
                                <span className="font-semibold text-green-600">{data?.flight?.transferIncluded ? 'Да' : 'Нет'}</span>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold text-gray-800 mb-6">Требования к документам</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <IoCheckmark className="text-green-600 flex-shrink-0 mt-1" size={24} />
                                <div>
                                    <p className="font-semibold text-gray-800">Виза</p>
                                    <p className="text-gray-600 text-sm">{data?.documents?.visaRequired ? 'Требуется' : 'Не требуется'}</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <IoCheckmark className="text-green-600 flex-shrink-0 mt-1" size={24} />
                                <div>
                                    <p className="font-semibold text-gray-800">Паспорт</p>
                                    <p className="text-gray-600 text-sm">Действителен минимум {data?.documents?.passportValidityMonths} месяцев</p>
                                </div>
                            </div>
                            <div className="flex items-start gap-3">
                                <IoCheckmark className="text-green-600 flex-shrink-0 mt-1" size={24} />
                                <div>
                                    <p className="font-semibold text-gray-800">Страховка</p>
                                    <p className={`text-sm ${data?.documents?.insuranceIncluded ? 'text-green-600' : 'text-gray-600'}`}>
                                        {data?.documents?.insuranceIncluded ? '✓ Включена в тур' : 'Требуется оформить отдельно'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    )
}

export default TourInfo

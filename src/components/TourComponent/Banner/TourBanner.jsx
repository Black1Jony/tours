import api from "../../../api/api"
import { FaStar, FaMapMarkerAlt, FaClock } from "react-icons/fa"

const TourBanner = ({ data }) => {

    return <>
        <div
            className="relative w-full h-[600px] overflow-hidden shadow-xl"
            style={{ 
                backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.2), rgba(0,0,0,0.7)), url(${data?.media?.cover})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <div className="absolute inset-0 flex flex-col justify-end p-8 md:p-12">
                <div className="max-w-3xl">
                    <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{data?.title}</h1>
                    
                    <div className="flex flex-wrap gap-6 text-white">
                        <div className="flex items-center gap-2">
                            <FaMapMarkerAlt className="text-blue-300" size={20} />
                            <span className="text-lg">{data?.city}, {data?.country}</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <FaStar className="text-yellow-300" size={20} />
                            <span className="text-lg">{data?.hotel?.stars} звёзд</span>
                        </div>
                        
                        <div className="flex items-center gap-2">
                            <FaClock className="text-blue-300" size={20} />
                            <span className="text-lg">{data?.duration?.days} дн / {data?.duration?.nights} ночей</span>
                        </div>
                    </div>
                    
                    <div className="mt-6 text-white text-xl">
                        <span className="font-bold text-yellow-300">{data?.price?.amount}</span>
                        <span className="ml-2">{data?.price?.currency} {data?.price?.discount}% скидка</span>
                    </div>
                </div>
            </div>
        </div>
    </>
}

export default TourBanner
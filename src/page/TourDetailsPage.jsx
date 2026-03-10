import { useState, useEffect } from "react"
import Header from "../components/components/Header"
import { useParams } from "react-router"
import api from "../api/api"
import TourBanner from "../components/TourComponent/Banner/TourBanner"
import TourInfo from "../components/TourComponent/TourInfo"
import TourItinerary from "../components/TourComponent/TourItinerary"
import TourGallery from "../components/TourComponent/TourGallery"
import BookingSection from "../components/TourComponent/BookingSection"
import Footer from "../components/components/footer/Footer"
const TourDetailsPage = () => {
    const {id} = useParams()
    const [data, setData] = useState({})
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const getData = async()=>{
            try {
                setLoading(true)
                const resp = await api.get(`/tour/${id}`)
                setData(resp.data)
            } catch (error) {
                console.error("Ошибка при загрузке тура:", error)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [id]);

    if (loading) {
        return (
            <>
                <Header isVisibility={false}/>
                <div className="w-full h-96 bg-gray-200 animate-pulse"></div>
            </>
        )
    }

    return <>
        <Header isVisibility={false}/>
        <TourBanner data={data}/>
        <TourInfo data={data}/>
        <TourItinerary data={data}/>
        <TourGallery data={data}/>
        <BookingSection data={data}/>
        <Footer/>
    </>
}

export default TourDetailsPage
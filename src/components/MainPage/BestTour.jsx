import { useEffect, useState } from "react"
import api from '../../api/api'
import Card from "../components/Card/Card"
import SkeletonCard from "../components/Card/SkeletonCard"

const BestTour = ({text="summer tours", season="summer"},) => {
    const [bestTour, setBestTour] = useState([])
    const [loading, setLoading] = useState(false)
    useEffect(() => {
        const getTours = async()=>{
            setLoading(true)
            const result = await api.get(`/season/${season}`)
            setBestTour(result.data)
            setLoading(false)
        }
        getTours()
    }, []);
    
  return <>
  <main className="mt-16 flex flex-col justify-center items-center w-full px-4">
    <div className="max-w-7xl w-full">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">{text}</h2>
        <div className="h-1 w-24 bg-blue-500 rounded mb-8"></div>
        
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {loading
                            ? Array.from({ length: 8 }).map((_, i) => (
                                    <div className="skeleton-wrapper" key={i}>
                                        <SkeletonCard />
                                    </div>
                                ))
                            : bestTour.map((tour, index) => <Card tour={tour} key={index} />)}
                </div>
    </div>
  </main>
  </>
}

export default BestTour
import { useEffect, useState } from "react"
import useFindStore from "../../../stores/useFindStore"
import api from '../../../api/api'
import Card from "../../components/Card/Card"
import { motion } from "motion/react"
const MainFilter = () => {
    const filterValues = useFindStore()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)
    const [sortBy, setSortBy] = useState({
        by: 'price.amount', 
        direction: 'asc'
    })
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 12
    })

    // Строим фильтры динамически из всех значений в filterValues
    const buildFilters = () => {
        const filters = {}
        
        if (filterValues.dateFrom) filters.dateFrom = filterValues.dateFrom
        if (filterValues.dateTo) filters.dateTo = filterValues.dateTo
        if (filterValues.country) filters.country = filterValues.country
        if (filterValues.guests) filters.guests = filterValues.guests
        if (filterValues.night) filters.nightRange = { min: filterValues.night[0], max: filterValues.night[1] }

        return filters
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true)
                setError(null)

                const query = {
                    filters: buildFilters(),
                    pagination,
                    sort: sortBy
                }

                const res = await api.post('filter', query)
                console.log(data);
                
                setData(res.data)
            } catch (err) {
                console.error('Filter error:', err)
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        fetchData()
    }, [filterValues, pagination, sortBy])

    return (
        <>
        <motion.main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-6">
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && data.length === 0 && <p>No tours found.</p>}
            {!loading && !error && data?.map(tour => (
                <Card key={tour.id} tour={tour} />
            ))}
        </motion.main>
        </>
    )
}

export default MainFilter
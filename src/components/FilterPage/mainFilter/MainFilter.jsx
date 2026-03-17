import { useEffect, useMemo, useState } from "react"
import useFindStore from "../../../stores/useFindStore"
import api from "../../../api/api"
import Card from "../../components/Card/Card"
import { motion } from "motion/react"
import { LoadingOutlined } from "@ant-design/icons"
import { Select, Spin } from "antd"
const MainFilter = () => {
  const filterValues = useFindStore()
  const [data, setData] = useState([])
  const [meta, setMeta] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [sortBy, setSortBy] = useState({ by: "price.amount", direction: "asc" })
  const [pagination, setPagination] = useState({ page: 1, limit: 12 })

  const requestBody = useMemo(
    () => ({
      country: filterValues.country ?? undefined,
      guests: filterValues.guests ?? undefined,
      priceMin: filterValues.priceMin ?? undefined,
      priceMax: filterValues.priceMax ?? undefined,
      stars: filterValues.stars ?? undefined,
      nights: Array.isArray(filterValues.nights) ? filterValues.nights : undefined,
      extras: Array.isArray(filterValues.extras) ? filterValues.extras : undefined,
      page: pagination.page,
      limit: pagination.limit,
      sortBy: sortBy.by,
      sortDir: sortBy.direction,
    }),
    [
      filterValues.country,
      filterValues.guests,
      filterValues.priceMin,
      filterValues.priceMax,
      filterValues.stars,
      filterValues.nights,
      filterValues.extras,
      pagination.page,
      pagination.limit,
      sortBy.by,
      sortBy.direction,
    ],
  )
  console.log(requestBody);
  useEffect(() => {
    let cancelled = false

    const fetchData = async () => {
      try {
        setLoading(true)
        setError(null)

        const res = await api.post("/filter", requestBody)
        const payload = res?.data

        const items = Array.isArray(payload) ? payload : payload?.items ?? []
        const nextMeta = Array.isArray(payload) ? null : payload?.meta ?? null

        if (!cancelled) {
          setData(items)
          setMeta(nextMeta)
        }
      } catch (err) {
        const serverError = err?.response?.data?.error
        if (!cancelled) setError(serverError || err.message)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    fetchData()
    return () => {
      cancelled = true
    }
  }, [requestBody])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const listKey = JSON.stringify(requestBody)

  const canNext =   meta?.matched !== undefined
      ? pagination.page * pagination.limit < meta.matched
      : data.length >= pagination.limit

  return (
    <>
      <main className="p-6 mb-28">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6 bg-white/70 backdrop-blur-md border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
          <div className="text-xs sm:text-sm text-gray-600">
            {meta?.reason === "NO_TOURS_IN_COLLECTION" && "В базе пока нет туров."}
            {meta?.reason === "NO_MATCHES" && "По заданным фильтрам туры не найдены."}
            {!meta?.reason && meta?.matched !== undefined && (
              <>
                Найдено: <span className="font-semibold text-gray-800">{meta.matched}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-3 flex-wrap justify-end">
            <Select
              size="middle"
              value={`${sortBy.by}:${sortBy.direction}`}
              onChange={(value) => {
                const [by, direction] = value.split(":")
                setPagination((p) => ({ ...p, page: 1 }))
                setSortBy({ by, direction })
              }}
              options={[
                { value: "price.amount:asc", label: "Цена: ↑" },
                { value: "price.amount:desc", label: "Цена: ↓" },
                { value: "hotel.stars:desc", label: "Звёзды: 5 → 1" },
                { value: "duration.nights:asc", label: "Ночи: ↑" },
              ]}
              className="min-w-[170px]"
            />

            <Select
              size="middle"
              value={pagination.limit}
              onChange={(value) => setPagination({ page: 1, limit: value })}
              options={[
                { value: 8, label: "8 / стр" },
                { value: 12, label: "12 / стр" },
                { value: 24, label: "24 / стр" },
              ]}
              className="min-w-[110px]"
            />
          </div>
        </div>

        {loading && (
          <div className="flex justify-center items-center py-10">
            <Spin
              indicator={<LoadingOutlined style={{ fontSize: 28 }} spin />}
              tip="Загружаем туры..."
              size="large"
            />
          </div>
        )}
        {error && <p className="text-red-500">Error: {error}</p>}
        {!loading && !error && data.length === 0 && !meta?.reason && <p>Туры не найдены.</p>}

        {!loading && !error && (
          <motion.div
            key={listKey}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {data?.map((tour) => (
              <Card key={tour._id} tour={tour} itemVariants={itemVariants} />
            ))}
          </motion.div>
        )}

        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            className="px-4 py-2 rounded-xl border border-gray-300 disabled:opacity-50"
            disabled={loading || pagination.page <= 1}
            onClick={() => setPagination((p) => ({ ...p, page: Math.max(1, p.page - 1) }))}
          >
            Назад
          </button>
          <div className="text-sm text-gray-600">
            Страница <span className="font-semibold text-gray-800">{pagination.page}</span>
          </div>
          <button
            className="px-4 py-2 rounded-xl border border-gray-300 disabled:opacity-50"
            disabled={loading || !canNext}
            onClick={() => setPagination((p) => ({ ...p, page: p.page + 1 }))}
          >
            Вперёд
          </button>
        </div>
      </main>
    </>
  )
}

export default MainFilter
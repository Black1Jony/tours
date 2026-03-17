import { Button, Checkbox, InputNumber, Select, Tooltip } from "antd"
import { motion } from "motion/react"
import useFindStore from "../../stores/useFindStore"
import countrydb from "../MainPage/Banner/countrydata"
import CounterNight from "../MainPage/Banner/counter/CounterNight"
import CounterGuest from "../MainPage/Banner/counter/CounterGuest"

const extrasOptions = [
  { label: "Wi‑Fi", value: "wifi" },
  { label: "SPA", value: "spa" },
  { label: "Бассейн", value: "pool" },
  { label: "Экскурсии", value: "excursionsAvailable" },
]

const FiltersBar = () => {
  const {
    country,
    setCountry,
    priceMin,
    priceMax,
    setPriceMin,
    setPriceMax,
    stars,
    setStars,
    extras,
    setExtras,
    setNight,
  } = useFindStore()

  const reset = () => {
    setCountry(null)
    setPriceMin(0)
    setPriceMax(1000000)
    setStars(null)
    setExtras([])
    setNight([4, 7])
  }

  return (
    <main className="px-3 sm:px-6 -mt-14 relative z-20">
      <motion.div
        className="max-w-7xl mx-auto bg-white/95 backdrop-blur-xl border border-gray-200 rounded-3xl shadow-xl p-4 sm:p-5"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        whileHover={{ y: -2, boxShadow: "0 24px 60px rgba(15, 23, 42, 0.18)" }}
      >
        <div className="flex flex-col lg:flex-row lg:items-end gap-4">
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold text-gray-600">Страна</div>
              <Select
                allowClear
                options={countrydb}
                placeholder="Выбери страну"
                value={country ?? undefined}
                onChange={(value) => setCountry(value ?? null)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold text-gray-600">Ночи</div>
              <CounterNight />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold text-gray-600">Гости</div>
              <CounterGuest />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold text-gray-600">Звёзды (от)</div>
              <Select
                allowClear
                placeholder="Любые"
                value={stars ?? undefined}
                onChange={(value) => setStars(value ?? null)}
                options={[1, 2, 3, 4, 5].map((v) => ({ value: v, label: `${v}+` }))}
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold text-gray-600">Цена от</div>
              <InputNumber
                className="w-full"
                min={0}
                value={priceMin}
                onChange={(v) => setPriceMin(v ?? 0)}
              />
            </div>

            <div className="flex flex-col gap-1">
              <div className="text-xs font-semibold text-gray-600">Цена до</div>
              <InputNumber
                className="w-full"
                min={0}
                value={priceMax}
                onChange={(v) => setPriceMax(v ?? 0)}
              />
            </div>

            <div className="flex flex-col gap-1 sm:col-span-2 lg:col-span-2">
              <div className="flex items-center justify-between">
                <div className="text-xs font-semibold text-gray-600">Допы</div>
                <Tooltip title="Учитываются только выбранные опции">
                  <span className="text-[10px] text-gray-400 uppercase tracking-wide cursor-help">
                    фильтр по удобствам
                  </span>
                </Tooltip>
              </div>
              <div className="mt-1">
                <Checkbox.Group
                  options={extrasOptions}
                  value={Array.isArray(extras) ? extras : []}
                  onChange={(vals) => setExtras(vals)}
                />
              </div>
            </div>
          </div>

          <div className="flex gap-3 justify-end">
            <Button
              onClick={reset}
              type="default"
              size="middle"
              className="!rounded-2xl !px-5 hover:!border-blue-400 hover:!text-blue-500"
            >
              Сбросить фильтры
            </Button>
          </div>
        </div>
      </motion.div>
    </main>
  )
}

export default FiltersBar

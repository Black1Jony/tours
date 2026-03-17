
const SkeletonCard = () => {
  return (
    <div className="w-full bg-white border border-gray-200 rounded-2xl overflow-hidden h-full shadow-sm">
      <div className="relative overflow-hidden">
        <div className="w-full h-56 bg-gray-200 animate-pulse" />
      </div>
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
      </div>
    </div>
  )
}

export default SkeletonCard

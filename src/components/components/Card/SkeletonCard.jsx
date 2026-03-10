import React from 'react'
import { Skeleton } from 'antd'

const SkeletonCard = () => {
  return (
    <div className='w-full bg-white border border-gray-200 rounded-2xl overflow-hidden h-full shadow-sm'>
      <div className='relative overflow-hidden'>
        <Skeleton.Image style={{ width: '100%', height: 224, objectFit: 'cover' }} active />
      </div>

      <div className='p-4'>
        <Skeleton active paragraph={{ rows: 2 }} />
      </div>
    </div>
  )
}

export default SkeletonCard

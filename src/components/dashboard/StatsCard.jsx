import Image from 'next/image'
import React from 'react'

const StatsCard = ({icon, title, description}) => {
  return (
    <div className='flex rounded-lg bg-site_secondary p-3 gap-5'>
      <div className="rounded-full text-whitee bg-primary-dark text-light-100 h-12 w-12 flex justify-center items-center">
        {icon}
      </div>
      <div>
        <p className='font-medium text-lg'>{title}</p>
        <p className='text-sm text-dark-500'>{description}</p>
      </div>
    </div>
  )
}

export default StatsCard

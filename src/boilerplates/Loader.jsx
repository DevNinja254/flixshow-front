import React from 'react'

const Loader = ({h1="h-32", h2="h-5"}) => {
  return (
   <div className='p-1'>
     <div className={`${h1} bg-gray-700  rounded-md opacity-80`}>
      </div>
      <div className={`${h2} bg-gray-700  rounded-md opacity-60 mt-2`}>

      </div>
   </div>
  )
}

export default Loader
